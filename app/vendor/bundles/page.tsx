"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const vendorBundles = [
  {
    id: "1",
    name: "Essential Kitchen Bundle",
    price: 50000,
    type: "kitchen",
    status: "active",
    sales: 45,
    image: "/kitchen-essentials-rice-beans-oil.jpg",
  },
  {
    id: "5",
    name: "Budget Kitchen Bundle",
    price: 30000,
    type: "kitchen",
    status: "active",
    sales: 89,
    image: "/budget-groceries-affordable-food.jpg",
  },
  {
    id: "7",
    name: "Premium Spice Bundle",
    price: 25000,
    type: "kitchen",
    status: "draft",
    sales: 0,
    image: "/assorted-spices.png",
  },
]

export default function VendorBundlesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredBundles = vendorBundles.filter((bundle) =>
    bundle.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bundles</h1>
              <p className="text-muted-foreground">Manage your product bundles</p>
            </div>
            <Button asChild>
              <Link href="/vendor/bundles/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Bundle
              </Link>
            </Button>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bundles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bundles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBundles.map((bundle) => (
              <Card key={bundle.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full bg-muted">
                    <Image src={bundle.image || "/placeholder.svg"} alt={bundle.name} fill className="object-cover" />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        bundle.status === "active"
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {bundle.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{bundle.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-primary">{formatPrice(bundle.price)}</p>
                      <Badge variant="outline">{bundle.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{bundle.sales} sales</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredBundles.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No bundles found.</p>
                <Button asChild>
                  <Link href="/vendor/bundles/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Bundle
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
