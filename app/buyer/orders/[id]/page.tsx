"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, MapPin, Calendar, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id

  // Sample order data
  const order = {
    id: orderId,
    bundleId: "1",
    bundleName: "Essential Kitchen Bundle",
    vendorName: "Fresh Mart Lagos",
    vendorId: "v1",
    price: 50000,
    status: "shipped" as const,
    createdAt: new Date("2025-01-10"),
    shippedAt: new Date("2025-01-11"),
    estimatedDelivery: new Date("2025-01-15"),
    items: [
      { id: "1", name: "Rice", quantity: "10", unit: "kg" },
      { id: "2", name: "Beans", quantity: "5", unit: "kg" },
      { id: "3", name: "Palm Oil", quantity: "3", unit: "L" },
      { id: "4", name: "Vegetable Oil", quantity: "2", unit: "L" },
    ],
    deliveryAddress: "123 Main Street, Ikeja, Lagos State",
    trackingNumber: "TRK-2025-001-ABC",
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleConfirmDelivery = () => {
    alert("Delivery confirmed! Vendor will receive payment shortly.")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/buyer/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{order.bundleName}</h1>
              <p className="text-muted-foreground">Order ID: {order.id}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Track your order progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className="w-0.5 h-12 bg-primary" />
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-semibold">Order Placed</p>
                    <p className="text-sm text-muted-foreground">{order.createdAt.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === "shipped" || order.status === "delivered" || order.status === "completed"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div
                      className={`w-0.5 h-12 ${
                        order.status === "delivered" || order.status === "completed" ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-semibold">Shipped</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippedAt ? order.shippedAt.toLocaleString() : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === "delivered" || order.status === "completed"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className={`w-0.5 h-12 ${order.status === "completed" ? "bg-primary" : "bg-muted"}`} />
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-semibold">Delivered</p>
                    <p className="text-sm text-muted-foreground">Est. {order.estimatedDelivery.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === "completed"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Completed</p>
                    <p className="text-sm text-muted-foreground">Awaiting confirmation</p>
                  </div>
                </div>
              </div>

              {order.status === "delivered" && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Button onClick={handleConfirmDelivery} className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Delivery
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Vendor will receive payment after confirmation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <Badge variant="outline">
                        {item.quantity}
                        {item.unit}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(order.price)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Vendor Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Vendor Name</p>
                    <p className="text-sm text-muted-foreground">{order.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-sm text-muted-foreground font-mono">{order.trackingNumber}</p>
                  </div>
                  {order.status === "completed" && (
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      <Star className="h-4 w-4 mr-2" />
                      Rate Vendor
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
