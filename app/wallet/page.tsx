import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, CreditCard, ArrowDownLeft, ArrowUpRight, History } from "lucide-react"
import Link from "next/link"

export default async function WalletPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile with wallet balance
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Fetch recent 5 transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

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
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen py-8 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="animate-in slide-in-from-top duration-500">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds securely</p>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-in slide-in-from-top duration-500 delay-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl md:text-5xl font-bold text-primary">{formatPrice(profile.wallet_balance || 0)}</p>
              <p className="text-sm text-muted-foreground mt-2">Available for purchases</p>
              <div className="mt-6">
                <Button size="lg" className="w-full sm:w-auto">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Fund Wallet
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <div className="animate-in slide-in-from-bottom duration-500 delay-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Recent Transactions</h2>
              <Button variant="ghost" asChild>
                <Link href="/wallet/transactions">
                  <History className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>

            {transactions && transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <Card
                    key={transaction.id}
                    className="hover:shadow-md transition-all duration-300 animate-in slide-in-from-bottom"
                    style={{ animationDelay: `${300 + index * 50}ms` }}
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
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
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
              <Card>
                <CardContent className="p-8 text-center">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No transactions yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Fund your wallet to get started</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
