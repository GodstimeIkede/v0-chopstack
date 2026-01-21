import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Chopstack",
  description: "Terms and conditions for using Chopstack platform",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">1. Platform Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Chopstack, you agree to be bound by these Terms and Conditions. The platform
                connects buyers with verified vendors and farmers for the purchase of pre-curated bundles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">2. Vendor Responsibilities</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Vendors and farmers using Chopstack agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate product descriptions and pricing</li>
                  <li>Maintain product quality and freshness standards</li>
                  <li>Complete KYC verification before selling</li>
                  <li>Deliver orders within agreed timeframes</li>
                  <li>Honor the escrow payment system</li>
                  <li>Respond promptly to buyer inquiries</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">3. Payments & Fees</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Vendor Subscription:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>First month is free for all new vendors</li>
                  <li>₦800 monthly subscription fee applies from the second month</li>
                  <li>Subscription must be active to list and sell bundles</li>
                </ul>
                <p className="pt-3">
                  <strong>Commission:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>5% commission charged on each successful sale</li>
                  <li>Commission is automatically deducted from vendor payout</li>
                </ul>
                <p className="pt-3">
                  <strong>Escrow System:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Buyer funds are held securely until delivery confirmation</li>
                  <li>Vendors receive payment only after buyer confirms receipt</li>
                  <li>Disputes are handled through our resolution process</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">4. Delivery & Location</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Pay on Delivery:</strong>
                </p>
                <p>
                  Chopstack supports Pay on Delivery for eligible orders. Delivery fees are calculated based on location
                  and distance. Buyers must provide accurate delivery addresses.
                </p>
                <p className="pt-3">
                  <strong>Delivery Timeframes:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard delivery: 2-5 business days</li>
                  <li>Express delivery: 1-2 business days (where available)</li>
                  <li>Livestock and farm products may require special handling</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">5. Privacy & Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take your privacy seriously. All personal information is encrypted and stored securely. We do not
                share your data with third parties without consent. Payment information is processed through secure
                payment gateways (Paystack). Users are responsible for maintaining the confidentiality of their account
                credentials.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">6. Account Security & Liability</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Users are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining secure passwords and account access</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>All activities conducted through their account</li>
                </ul>
                <p className="pt-3">
                  Chopstack is not liable for losses resulting from unauthorized account access due to user negligence.
                  We reserve the right to suspend accounts showing suspicious activity.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">7. Refunds & Disputes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Buyers may request refunds for undelivered orders or products that do not match descriptions. Disputes
                must be raised within 48 hours of delivery. Our support team will mediate and resolve disputes fairly.
                Refunds are processed within 5-7 business days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">8. Prohibited Activities</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Users must not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>List counterfeit or illegal products</li>
                  <li>Engage in fraudulent transactions</li>
                  <li>Manipulate reviews or ratings</li>
                  <li>Harass other users or vendors</li>
                  <li>Attempt to bypass platform fees</li>
                </ul>
                <p className="pt-3">Violation of these terms may result in account suspension or permanent ban.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chopstack reserves the right to modify these terms at any time. Users will be notified of significant
                changes via email. Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">10. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, contact us at{" "}
                <a href="mailto:chopstackbystokit@gmail.com" className="text-primary hover:underline">
                  chopstackbystokit@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
