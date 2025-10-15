import type { Bundle } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BundleCardProps {
  bundle: Bundle
}

export function BundleCard({ bundle }: BundleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getBundleTypeColor = (type: Bundle["type"]) => {
    switch (type) {
      case "kitchen":
        return "bg-primary/10 text-primary hover:bg-primary/20"
      case "farm":
        return "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
      case "livestock":
        return "bg-accent/10 text-accent-foreground hover:bg-accent/20"
    }
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={bundle.image || "/placeholder.svg"}
            alt={bundle.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className={`absolute top-3 right-3 ${getBundleTypeColor(bundle.type)} transition-all`}>
            {bundle.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {bundle.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{bundle.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{bundle.vendorName}</span>
            {bundle.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-medium text-foreground">{bundle.rating}</span>
                <span>({bundle.reviewCount})</span>
              </div>
            )}
          </div>
          <div className="pt-2">
            <p className="text-2xl font-bold text-primary">{formatPrice(bundle.price)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
          <Link href={`/bundle/${bundle.id}`}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            View Bundle
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
