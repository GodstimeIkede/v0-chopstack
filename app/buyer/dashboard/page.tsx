import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Wallet, ShoppingBag, Package, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import type { Order } from "@/lib/types"

// Sample data - will be replaced with real data from database
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    bundleId: "1",
    bundleName: "Essential Kitchen Bundle",
    buyerId: "buyer1",
    vendorId: "v1",
    vendorName: "Fresh Mart Lagos",
    price: 50000,
    status: "shipped",
    createdAt: new Date("2025-01-10"),
    items: [
      { id: "1", name: "Rice", quantity: "10", unit: "kg" },
      { id: "2", name: "Beans", quantity: "5", unit: "kg" },
    ],
  },
  {
    id: "ORD-002",
    bundleId: "5",
    bundleName: "Budget Kitchen Bundle",
    buyerId: "buyer1",
    vendorId: "v1",
    vendorName: "Fresh Mart Lagos",
    price: 30000,
    status: "delivered",
    createdAt: new Date("2025-01-05"),
    items: [
      { id: "1", name: "Rice", quantity: "5", unit: "kg" },
      { id: "2", name: "Beans", quantity: "3", unit: "kg" },
    ],
  },
]

export default async function BuyerDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch buyer profile
  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profileError || !profile) {
    redirect("/auth/login")
  }

  // Ensure user is a buyer
  if (profile.user_type !== "buyer") {
    redirect("/vendor/dashboard")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const walletBalance = profile.wallet_balance || 0
  const totalSpent = sampleOrders.reduce((sum, order) => sum + order.price, 0)
  const activeOrders = sampleOrders.filter((o) => o.status !== "completed").length

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {profile.full_name || "Buyer"}</h1>
            <p className="text-muted-foreground">Manage your orders, wallet, and preferences</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{formatPrice(walletBalance)}</div>
                <Button size="sm" className="mt-3 bg-transparent" variant="outline" asChild>
                  <Link href="/wallet">
                    <Wallet className="h-4 w-4 mr-1" />
                    View Wallet
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">Orders in progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleOrders.length}</div>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(totalSpent)}</div>
                <p className="text-xs text-muted-foreground mt-1">Lifetime spending</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/">
                    <ShoppingBag className="h-6 w-6" />
                    <span>Browse Bundles</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/buyer/orders">
                    <Package className="h-6 w-6" />
                    <span>View All Orders</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/wallet">
                    <Wallet className="h-6 w-6" />
                    <span>Manage Wallet</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest bundle purchases</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/buyer/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{order.bundleName}</h4>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{order.vendorName}</p>
                      <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-primary">{formatPrice(order.price)}</p>
                        <p className="text-xs text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/buyer/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
