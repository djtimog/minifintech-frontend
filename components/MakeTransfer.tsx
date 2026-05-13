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
import { PlusCircle } from "lucide-react";

export function TransferDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          className={
            "outline flex p-2.5 gap-2 justify-center items-center rounded-lg text-xs hover:bg-secondary"
          }
        >
          <PlusCircle size={"16"} />
          Make Transfer
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
            <DialogDescription>
              Enter the recipient details and amount to send money securely.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="recipient-name">Recipient Name</Label>
              <Input
                id="recipient-name"
                name="recipientName"
                placeholder="John Doe"
              />
            </Field>
            <Field>
              <Label htmlFor="recipient-account">Recipient Account</Label>
              <Input
                id="recipient-account"
                name="recipientAccount"
                placeholder="1234567890"
              />
            </Field>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="1000"
              />
            </Field>
            <Field>
              <Label htmlFor="note">Note (optional)</Label>
              <Input id="note" name="note" placeholder="Payment for services" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
