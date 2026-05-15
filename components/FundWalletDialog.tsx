"use client";

import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateBalance } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fundWalletSchema, FundWalletInput } from "@/lib/types";
import PaymentService from "@/services/paymentService";
import { Wallet } from "lucide-react";

function genReference() {
  return `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

type Step = "form" | "pending" | "success" | "error";

export function FundWalletDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [currentRef, setCurrentRef] = useState("");
  const [newBalance, setNewBalance] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FundWalletInput>({
    resolver: zodResolver(fundWalletSchema) as Resolver<FundWalletInput>,
  });

  const initMutation = useMutation({
    mutationFn: (data: FundWalletInput) => {
      const reference = genReference();
      setCurrentRef(reference);
      return PaymentService.initializePayment({
        email: user?.email ?? "",
        amount: data.amount * 100, // kobo
        reference,
        callbackUrl: `${window.location.origin}/dashboard/fund/callback`,
      });
    },
    onSuccess: (data) => {
      if (data.authorizationUrl) {
        window.open(data.authorizationUrl, "_blank");
        setStep("pending");
      } else {
        setStep("pending");
      }
    },
    onError: () => setStep("error"),
  });

  const verifyMutation = useMutation({
    mutationFn: () => PaymentService.verifyPayment(currentRef),
    onSuccess: (data) => {
      // backend returns newBalance in kobo
      const balanceInNaira = data.newBalance / 100;
      dispatch(updateBalance(balanceInNaira));
      setNewBalance(balanceInNaira);
      setStep("success");
    },
    onError: () => setStep("error"),
  });

  const onSubmit = (data: FundWalletInput) => {
    setStep("form");
    initMutation.mutate(data);
  };

  const handleClose = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setTimeout(() => {
        setStep("form");
        setCurrentRef("");
        setNewBalance(null);
        reset();
      }, 300);
    }
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="flex gap-2 text-xs px-3 py-2.5 h-auto"
        >
          <Wallet size={16} />
          Fund Wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Fund Wallet</DialogTitle>
          <DialogDescription>
            {step === "form" &&
              "Enter an amount to add to your wallet via Paystack."}
            {step === "pending" &&
              "Complete payment in the Paystack tab, then verify below."}
            {step === "success" && "Your wallet has been funded successfully."}
            {step === "error" && "Something went wrong. Please try again."}
          </DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <Label htmlFor="fund-amount">Amount (₦)</Label>
                <Input
                  id="fund-amount"
                  type="number"
                  placeholder="e.g. 5000"
                  {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && (
                  <p className="text-xs text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={initMutation.isPending}>
                {initMutation.isPending
                  ? "Initializing..."
                  : "Proceed to Paystack"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === "pending" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-muted p-3 text-xs font-mono text-muted-foreground break-all">
              Ref: {currentRef}
            </div>
            <p className="text-sm text-muted-foreground">
              After completing payment on Paystack, click verify to confirm and
              credit your wallet.
            </p>
            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => {
                  initMutation.reset();
                  setStep("form");
                }}
              >
                Back
              </Button>
              <Button
                onClick={() => verifyMutation.mutate()}
                disabled={verifyMutation.isPending}
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify payment"}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="text-4xl">🎉</div>
            <p className="text-sm text-muted-foreground">
              New balance:{" "}
              <span className="font-semibold text-foreground">
                {newBalance !== null ? fmt(newBalance) : "—"}
              </span>
            </p>
            <DialogClose>
              <Button className="mt-2 w-full">Done</Button>
            </DialogClose>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="text-4xl">❌</div>
            <p className="text-sm text-muted-foreground">
              Could not complete the request. Make sure your backend is running
              on port 3003.
            </p>
            <DialogFooter className="w-full">
              <Button variant="outline" onClick={() => setStep("form")}>
                Try again
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
