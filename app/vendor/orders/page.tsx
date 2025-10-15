"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Package } from "lucide-react"
import { useState } from "react"
import type { DeliveryStatus } from "@/lib/types"

const vendorOrders = [
  {
    id: "ORD-001",
    bundleName: "Essential Kitchen Bundle",
    buyer: "John Doe",
    amount: 50000,
    status: "shipped" as DeliveryStatus,
    date: new Date("2025-01-10"),
  },
  {
    id: "ORD-005",
    bundleName: "Budget Kitchen Bundle",
    buyer: "Jane Smith",
    amount: 30000,
    status: "pending" as DeliveryStatus,
    date: new Date("2025-01-12"),
  },
  {
    id: "ORD-008",
    bundleName: "Essential Kitchen Bundle",
    buyer: "Mike Johnson",
    amount: 50000,
    status: "delivered" as DeliveryStatus,
    date: new Date("2025-01-08"),
  },
  {
    id: "ORD-012",
    bundleName: "Budget Kitchen Bundle",
    buyer: "Sarah Williams",
    amount: 30000,
    status: "completed" as DeliveryStatus,
    date: new Date("2025-01-05"),
  },
]

export default function VendorOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredOrders = vendorOrders.filter((order) => {
    const matchesSearch =
      order.bundleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders and deliveries</p>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, bundle, or buyer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={statusFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("all")}
                >
                  All Orders
                </Badge>
                <Badge
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending
                </Badge>
                <Badge
                  variant={statusFilter === "shipped" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("shipped")}
                >
                  Shipped
                </Badge>
                <Badge
                  variant={statusFilter === "delivered" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("delivered")}
                >
                  Delivered
                </Badge>
                <Badge
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("completed")}
                >
                  Completed
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
            </p>

            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-xl">{order.bundleName}</CardTitle>
                        <StatusBadge status={order.status} />
                      </div>
                      <CardDescription>
                        Order ID: {order.id} • Buyer: {order.buyer}
                      </CardDescription>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-primary">{formatPrice(order.amount)}</p>
                      <p className="text-sm text-muted-foreground">{order.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      {order.status === "pending" && (
                        <p className="text-sm text-muted-foreground">
                          <Package className="h-4 w-4 inline mr-1" />
                          Action required: Prepare and ship this order
                        </p>
                      )}
                      {order.status === "delivered" && (
                        <p className="text-sm text-muted-foreground">Awaiting buyer confirmation for payment release</p>
                      )}
                      {order.status === "completed" && <p className="text-sm text-primary">Payment received</p>}
                    </div>
                    <div className="flex items-end gap-2">
                      {order.status === "pending" && (
                        <Button size="sm">
                          <Package className="h-4 w-4 mr-2" />
                          Mark as Shipped
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredOrders.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No orders found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
