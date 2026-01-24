import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Suspense } from "react"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Chopstack - Smart Kitchen & Farm Stocking",
  description:
    "Connect with verified vendors and farmers for pre-curated stock-up bundles. The smart way to stock your kitchen and farm needs.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <Footer />
          </Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
