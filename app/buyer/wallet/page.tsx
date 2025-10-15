"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownLeft, ArrowUpRight, CreditCard, Wallet } from "lucide-react"
import { useState } from "react"
import type { Transaction } from "@/lib/types"

const sampleTransactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "debit",
    amount: 50000,
    description: "Payment for Essential Kitchen Bundle",
    date: new Date("2025-01-10"),
  },
  {
    id: "TXN-002",
    type: "credit",
    amount: 100000,
    description: "Wallet top-up via Paystack",
    date: new Date("2025-01-08"),
  },
  {
    id: "TXN-003",
    type: "debit",
    amount: 30000,
    description: "Payment for Budget Kitchen Bundle",
    date: new Date("2025-01-05"),
  },
  {
    id: "TXN-004",
    type: "credit",
    amount: 75000,
    description: "Wallet top-up via Paystack",
    date: new Date("2025-01-03"),
  },
]

const walletBalance = 125000

export default function WalletPage() {
  const [fundAmount, setFundAmount] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleFundWallet = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for Paystack integration
    alert(`Funding wallet with ${formatPrice(Number(fundAmount))}. Paystack integration coming soon!`)
    setFundAmount("")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and view transaction history</p>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl md:text-5xl font-bold text-primary">{formatPrice(walletBalance)}</p>
              <p className="text-sm text-muted-foreground mt-2">Available for purchases</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="fund" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fund">Fund Wallet</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            {/* Fund Wallet Tab */}
            <TabsContent value="fund" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Funds</CardTitle>
                  <CardDescription>Top up your wallet using Paystack or manual transfer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFundWallet} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (NGN)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        min="1000"
                        step="100"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Minimum: ₦1,000</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button type="submit" className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay with Paystack
                      </Button>
                      <Button type="button" variant="outline" className="w-full bg-transparent">
                        Manual Transfer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Top-up</CardTitle>
                  <CardDescription>Select a preset amount</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[10000, 25000, 50000, 100000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setFundAmount(amount.toString())}
                        className="h-auto py-4"
                      >
                        {formatPrice(amount)}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transaction History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>All your wallet transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "credit"
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {transaction.type === "credit" ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{transaction.date.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "credit" ? "text-primary" : "text-destructive"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}
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
          </Tabs>
        </div>
      </div>
    </div>
  )
}
