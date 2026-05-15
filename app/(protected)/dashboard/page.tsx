"use client";

import { FundWalletDialog } from "@/components/FundWalletDialog";
import LogoutBtn from "@/components/LogoutBtn";
import { TransferDialog } from "@/components/MakeTransfer";
import { ModeToggle } from "@/components/ModeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

export default function DashboardContent() {
  const user = useAppSelector((state) => state.auth.user);
  const balance = user?.balance ?? 0;

  const firstName = user?.firstName ?? "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const fmt = (n: number) =>
    n.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold">
            {greeting}, {firstName} 👋
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <ModeToggle />
            <FundWalletDialog />
            <TransferDialog />
            <LogoutBtn />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Here&apos;s a quick overview of your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{fmt(balance)}</p>
            {user?.walletId && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                ID: {user.walletId}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{fmt(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">{fmt(0)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No transactions yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
