import type { Metadata } from "next"
import { Target, Eye, Heart, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Chopstack",
  description: "Learn about Chopstack - The smart way to stock up your kitchen and farm needs",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">About Chopstack</h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              The Smart Way to Stock Up Your Kitchen and Farm Needs
            </p>
          </div>

          {/* Mission */}
          <section className="space-y-4 animate-slide-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To make stocking your kitchen and farm products effortless, secure, and affordable. We connect buyers with
              verified vendors and farmers across Africa, ensuring quality products reach your doorstep with complete
              transparency and trust.
            </p>
          </section>

          {/* Vision */}
          <section className="space-y-4 animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To become Africa's most trusted platform for kitchen and farm bundle stocking, empowering millions of
              buyers and vendors to transact with confidence and convenience.
            </p>
          </section>

          {/* Core Values */}
          <section className="space-y-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-stagger">
              <div className="p-6 bg-card border border-border rounded-lg space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-foreground">Trust</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We verify every vendor and use escrow payments to ensure safe transactions for all parties.
                </p>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-foreground">Convenience</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pre-curated bundles make shopping simple. Browse, select, and receive quality products at your
                  doorstep.
                </p>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-foreground">Simplicity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform is designed to be intuitive and easy to use for both buyers and vendors.
                </p>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-foreground">Reliability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We ensure consistent quality and timely delivery through our verified vendor network.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 animate-slide-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">How It Works</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">Browse Bundles</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Explore pre-curated bundles from verified vendors that fit your budget and needs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">Fund Your Wallet</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Add funds securely using Paystack or manual top-up options.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">Place Your Order</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Customize your bundle if needed and place your order. Funds are held securely in escrow.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">Receive & Confirm</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Track your delivery and confirm receipt. Vendor receives payment only after your confirmation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
