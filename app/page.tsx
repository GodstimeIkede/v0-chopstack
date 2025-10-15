"use client"

import { BundleCard } from "@/components/bundle-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { sampleBundles } from "@/lib/data"
import type { BundleType } from "@/lib/types"
import { Search, Filter, Shield, CheckCircle, Truck } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<BundleType | "all">("all")
  const [priceRange, setPriceRange] = useState<"all" | "low" | "mid" | "high">("all")

  const filteredBundles = sampleBundles.filter((bundle) => {
    const matchesSearch =
      bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || bundle.type === selectedType

    let matchesPrice = true
    if (priceRange === "low") matchesPrice = bundle.price < 50000
    if (priceRange === "mid") matchesPrice = bundle.price >= 50000 && bundle.price < 100000
    if (priceRange === "high") matchesPrice = bundle.price >= 100000

    return matchesSearch && matchesType && matchesPrice
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance text-foreground">
              The Smart Way to Stock Up
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Connect with verified vendors and farmers for pre-curated kitchen and farm bundles. Secure, affordable,
              and delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="animate-scale-in">
                <a href="#bundles">Browse Bundles</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="animate-scale-in bg-transparent"
                style={{ animationDelay: "0.1s" }}
              >
                <a href="/vendor/dashboard">Become a Vendor</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      <section id="bundles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="space-y-4 animate-slide-in">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bundles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="md:w-auto bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedType === "all" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedType("all")}
                >
                  All Bundles
                </Badge>
                <Badge
                  variant={selectedType === "kitchen" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedType("kitchen")}
                >
                  Kitchen
                </Badge>
                <Badge
                  variant={selectedType === "farm" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedType("farm")}
                >
                  Farm
                </Badge>
                <Badge
                  variant={selectedType === "livestock" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedType("livestock")}
                >
                  Livestock
                </Badge>
              </div>

              {/* Price Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground self-center">Budget:</span>
                <Badge
                  variant={priceRange === "all" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setPriceRange("all")}
                >
                  All Prices
                </Badge>
                <Badge
                  variant={priceRange === "low" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setPriceRange("low")}
                >
                  Under ₦50,000
                </Badge>
                <Badge
                  variant={priceRange === "mid" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setPriceRange("mid")}
                >
                  ₦50,000 - ₦100,000
                </Badge>
                <Badge
                  variant={priceRange === "high" ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setPriceRange("high")}
                >
                  Above ₦100,000
                </Badge>
              </div>
            </div>

            {/* Results */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredBundles.length} bundle{filteredBundles.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
                {filteredBundles.map((bundle) => (
                  <BundleCard key={bundle.id} bundle={bundle} />
                ))}
              </div>
              {filteredBundles.length === 0 && (
                <div className="text-center py-12 animate-fade-in">
                  <p className="text-muted-foreground">No bundles found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
            <div className="text-center space-y-3 p-6 rounded-lg hover:bg-card transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Funds held in escrow until delivery is confirmed
              </p>
            </div>
            <div className="text-center space-y-3 p-6 rounded-lg hover:bg-card transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Verified Vendors</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All vendors are KYC verified for your safety
              </p>
            </div>
            <div className="text-center space-y-3 p-6 rounded-lg hover:bg-card transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track your order from vendor to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
