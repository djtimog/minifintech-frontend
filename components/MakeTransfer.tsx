"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { transferSchema, TransferInput } from "@/lib/types";
import { PlusCircle } from "lucide-react";

const mockTransfer = (data: TransferInput): Promise<{ message: string }> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ message: "Transfer successful" }), 1000),
  );

export function TransferDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferInput>({
    resolver: zodResolver(transferSchema),
  });

  const transferMutation = useMutation({
    mutationFn: (data: TransferInput) => mockTransfer(data),
    onSuccess: () => {
      reset();
      setOpen(false);
    },
  });

  const onSubmit = (data: TransferInput) => transferMutation.mutate(data);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger className="outline flex p-2.5 gap-2 justify-center items-center rounded-lg text-xs hover:bg-secondary">
        <PlusCircle size={16} />
        Make Transfer
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogDescription>
            Enter the recipient details and amount to send money securely.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <Label htmlFor="recipient-name">Recipient Name</Label>
              <Input
                id="recipient-name"
                placeholder="John Doe"
                {...register("recipientName")}
              />
              {errors.recipientName && (
                <p className="text-xs text-red-500">
                  {errors.recipientName.message}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="recipient-account">Recipient Account</Label>
              <Input
                id="recipient-account"
                placeholder="1234567890"
                {...register("recipientAccount")}
              />
              {errors.recipientAccount && (
                <p className="text-xs text-red-500">
                  {errors.recipientAccount.message}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1000"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">{errors.amount.message}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="note">Note (optional)</Label>
              <Input
                id="note"
                placeholder="Payment for services"
                {...register("note")}
              />
            </Field>

            {transferMutation.isError && (
              <p className="text-xs text-red-500 text-center">
                Transfer failed. Please try again.
              </p>
            )}
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose>
              <Button variant="outline" type="button" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={transferMutation.isPending}>
              {transferMutation.isPending ? "Transferring..." : "Transfer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
