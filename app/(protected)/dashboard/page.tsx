import LogoutBtn from "@/components/LogoutBtn";
import { ModeToggle } from "@/components/ModeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardContent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <div className="flex items-center justify-between flex-wrap gap-10">
          <h1 className="text-2xl font-bold">Good morning, John 👋</h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <LogoutBtn />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a quick overview of your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$0.00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">$0.00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">$0.00</p>
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
