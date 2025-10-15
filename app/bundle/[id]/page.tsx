"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { sampleBundles } from "@/lib/data"
import { ArrowLeft, ShoppingCart, Star, Package, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BundleDetailPage() {
  const params = useParams()
  const bundle = sampleBundles.find((b) => b.id === params.id)

  if (!bundle) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Bundle not found</h1>
          <Button asChild>
            <Link href="/">Browse Bundles</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    alert("Bundle added to cart! Redirecting to checkout...")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bundles
            </Link>
          </Button>

          {/* Bundle Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden bg-muted">
              <Image src={bundle.image || "/placeholder.svg"} alt={bundle.name} fill className="object-cover" />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{bundle.type}</Badge>
                  {bundle.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium">{bundle.rating}</span>
                      <span className="text-muted-foreground">({bundle.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{bundle.name}</h1>
                <p className="text-lg text-muted-foreground">{bundle.description}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-1">Vendor</p>
                <p className="text-lg font-semibold">{bundle.vendorName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-4xl font-bold text-primary">{formatPrice(bundle.price)}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Bundle Contents
                  </CardTitle>
                  <CardDescription>What's included in this bundle</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {bundle.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">
                          {item.name} - {item.quantity}
                          {item.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/buyer/wallet">Fund Wallet First</Link>
                </Button>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Delivery Information</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Standard delivery: 2-5 business days</li>
                  <li>• Pay on delivery available</li>
                  <li>• Funds held in escrow until confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
