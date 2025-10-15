import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function TransactionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch all transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen py-8 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-in slide-in-from-top duration-500">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Transaction History</h1>
              <p className="text-muted-foreground">All your wallet transactions</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/wallet">Back to Wallet</Link>
            </Button>
          </div>

          {/* Transactions List */}
          {transactions && transactions.length > 0 ? (
            <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-100">
              {transactions.map((transaction, index) => (
                <Card
                  key={transaction.id}
                  className="hover:shadow-md transition-all duration-300 animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${200 + index * 30}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
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
                          <p className="text-xs text-muted-foreground">{formatDate(transaction.created_at)}</p>
                          {transaction.reference && (
                            <p className="text-xs text-muted-foreground mt-1">Ref: {transaction.reference}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold text-lg ${
                            transaction.type === "credit" ? "text-primary" : "text-destructive"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatPrice(Number(transaction.amount))}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="animate-in slide-in-from-bottom duration-500 delay-100">
              <CardContent className="p-12 text-center">
                <Wallet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
                <p className="text-muted-foreground mb-6">Your transaction history will appear here</p>
                <Button asChild>
                  <Link href="/wallet">Go to Wallet</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
