"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, ArrowDownLeft, Calendar } from "lucide-react"

const earningsData = {
  totalEarnings: 450000,
  pendingEarnings: 80000,
  availableForWithdrawal: 370000,
  thisMonth: 120000,
  lastMonth: 95000,
}

const transactions = [
  {
    id: "TXN-001",
    description: "Payment for Essential Kitchen Bundle",
    amount: 49500,
    commission: 500,
    date: new Date("2025-01-10"),
    status: "completed",
  },
  {
    id: "TXN-002",
    description: "Payment for Budget Kitchen Bundle",
    amount: 29700,
    commission: 300,
    date: new Date("2025-01-08"),
    status: "completed",
  },
  {
    id: "TXN-003",
    description: "Monthly Subscription Fee",
    amount: -800,
    commission: 0,
    date: new Date("2025-01-01"),
    status: "completed",
  },
  {
    id: "TXN-004",
    description: "Payment for Essential Kitchen Bundle (Pending)",
    amount: 49500,
    commission: 500,
    date: new Date("2025-01-12"),
    status: "pending",
  },
]

export default function VendorEarningsPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Earnings</h1>
            <p className="text-muted-foreground">Track your revenue and manage payouts</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{formatPrice(earningsData.totalEarnings)}</div>
                <p className="text-xs text-muted-foreground mt-1">All time revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">{formatPrice(earningsData.pendingEarnings)}</div>
                <p className="text-xs text-muted-foreground mt-1">In escrow</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatPrice(earningsData.availableForWithdrawal)}</div>
                <p className="text-xs text-muted-foreground mt-1">Ready for withdrawal</p>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal */}
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Earnings</CardTitle>
              <CardDescription>Transfer your available balance to your bank account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold text-primary">{formatPrice(earningsData.availableForWithdrawal)}</p>
                </div>
                <Button>Request Withdrawal</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Withdrawals are processed within 2-3 business days. A 1% commission has already been deducted from your
                earnings.
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="summary">Monthly Summary</TabsTrigger>
            </TabsList>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>All your earnings and deductions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.amount > 0
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{transaction.date.toLocaleDateString()}</span>
                              {transaction.commission > 0 && (
                                <span>• Commission: {formatPrice(transaction.commission)}</span>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded ${
                                  transaction.status === "completed"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-secondary/10 text-secondary-foreground"
                                }`}
                              >
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${transaction.amount > 0 ? "text-primary" : "text-destructive"}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {formatPrice(transaction.amount)}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Summary Tab */}
            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                  <CardDescription>Your earnings breakdown by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">This Month</p>
                          <p className="text-sm text-muted-foreground">January 2025</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-primary">{formatPrice(earningsData.thisMonth)}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Last Month</p>
                          <p className="text-sm text-muted-foreground">December 2024</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{formatPrice(earningsData.lastMonth)}</p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-2">Growth</p>
                      <p className="text-2xl font-bold text-primary">
                        +
                        {Math.round(((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100)}
                        %
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
