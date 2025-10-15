"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Order, DeliveryStatus } from "@/lib/types"

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
  {
    id: "ORD-003",
    bundleId: "2",
    bundleName: "Premium Kitchen Bundle",
    buyerId: "buyer1",
    vendorId: "v2",
    vendorName: "Abuja Food Hub",
    price: 100000,
    status: "pending",
    createdAt: new Date("2025-01-12"),
    items: [
      { id: "1", name: "Rice", quantity: "25", unit: "kg" },
      { id: "2", name: "Beans", quantity: "10", unit: "kg" },
    ],
  },
  {
    id: "ORD-004",
    bundleId: "3",
    bundleName: "Farm Starter Pack",
    buyerId: "buyer1",
    vendorId: "v3",
    vendorName: "AgriSupply Nigeria",
    price: 75000,
    status: "completed",
    createdAt: new Date("2024-12-28"),
    deliveredAt: new Date("2025-01-02"),
    items: [
      { id: "1", name: "Maize Seeds", quantity: "5", unit: "kg" },
      { id: "2", name: "Fertilizer", quantity: "50", unit: "kg" },
    ],
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.bundleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage all your bundle orders</p>
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
                  placeholder="Search by order ID, bundle name, or vendor..."
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
                        Order ID: {order.id} • {order.vendorName}
                      </CardDescription>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-primary">{formatPrice(order.price)}</p>
                      <p className="text-sm text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Items:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            • {item.name} - {item.quantity}
                            {item.unit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-end">
                      <Button asChild>
                        <Link href={`/buyer/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
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
