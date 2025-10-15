import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Package, ShoppingBag, TrendingUp, Plus, AlertCircle, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default async function VendorDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch vendor profile
  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profileError || !profile) {
    redirect("/auth/login")
  }

  // Ensure user is a vendor
  if (profile.user_type !== "vendor") {
    redirect("/buyer/dashboard")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const vendorData = {
    name: profile.business_name || profile.full_name || "Vendor",
    verified: profile.kyc_status === "verified",
    kycCompleted: profile.kyc_status !== "pending",
    subscriptionActive: profile.subscription_status === "active" || profile.subscription_status === "free_trial",
    subscriptionEndDate: profile.subscription_expires_at ? new Date(profile.subscription_expires_at) : new Date(),
    totalEarnings: 450000, // TODO: Calculate from orders
    pendingEarnings: 80000, // TODO: Calculate from pending orders
    totalSales: 12, // TODO: Count from orders
    activeBundles: 5, // TODO: Count from bundles
    rating: 4.8, // TODO: Calculate from reviews
    reviewCount: 124, // TODO: Count from reviews
  }

  const recentOrders = [
    {
      id: "ORD-001",
      bundleName: "Essential Kitchen Bundle",
      buyer: "John Doe",
      amount: 50000,
      status: "shipped",
      date: new Date("2025-01-10"),
    },
    {
      id: "ORD-005",
      bundleName: "Budget Kitchen Bundle",
      buyer: "Jane Smith",
      amount: 30000,
      status: "pending",
      date: new Date("2025-01-12"),
    },
  ]

  const daysUntilRenewal = vendorData.subscriptionEndDate
    ? Math.ceil((vendorData.subscriptionEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {vendorData.name}</p>
            </div>
            <div className="flex items-center gap-2">
              {vendorData.verified && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              {vendorData.subscriptionActive && (
                <Badge className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                  {profile.subscription_status === "free_trial" ? "Free Trial" : "Active"}
                </Badge>
              )}
            </div>
          </div>

          {/* KYC Alert */}
          {!vendorData.kycCompleted && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-destructive mb-1">Complete Your KYC</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You need to complete KYC verification to start selling bundles.
                    </p>
                    <Button size="sm" asChild>
                      <Link href="/vendor/kyc">Complete KYC</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subscription Alert */}
          {vendorData.subscriptionActive && daysUntilRenewal > 0 && daysUntilRenewal <= 7 && (
            <Card className="border-secondary/50 bg-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Subscription Renewal</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your subscription renews in {daysUntilRenewal} days. ₦800 will be charged automatically.
                    </p>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Manage Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{formatPrice(vendorData.totalEarnings)}</div>
                <p className="text-xs text-muted-foreground mt-1">All time revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{formatPrice(vendorData.pendingEarnings)}</div>
                <p className="text-xs text-muted-foreground mt-1">In escrow</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vendorData.totalSales}</div>
                <p className="text-xs text-muted-foreground mt-1">Completed orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Bundles</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vendorData.activeBundles}</div>
                <p className="text-xs text-muted-foreground mt-1">Listed products</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your vendor account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/vendor/bundles/create">
                    <Plus className="h-6 w-6" />
                    <span>Create Bundle</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/vendor/bundles">
                    <Package className="h-6 w-6" />
                    <span>My Bundles</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/vendor/orders">
                    <ShoppingBag className="h-6 w-6" />
                    <span>View Orders</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/vendor/earnings">
                    <DollarSign className="h-6 w-6" />
                    <span>Earnings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Rating</CardTitle>
                <CardDescription>Your customer satisfaction score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-primary">{vendorData.rating}</p>
                    <p className="text-sm text-muted-foreground">{vendorData.reviewCount} reviews</p>
                  </div>
                  <div className="text-right">
                    <Progress value={vendorData.rating * 20} className="w-32 h-2" />
                    <p className="text-xs text-muted-foreground mt-2">Excellent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{order.bundleName}</p>
                        <p className="text-xs text-muted-foreground">{order.buyer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-primary">{formatPrice(order.amount)}</p>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/vendor/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
