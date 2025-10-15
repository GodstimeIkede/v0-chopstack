"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VendorKYCPage() {
  const [kycData, setKycData] = useState({
    businessName: "",
    businessType: "individual",
    registrationNumber: "",
    taxId: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("KYC data:", kycData)
    alert("KYC submitted successfully! We'll review your information within 24-48 hours.")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/vendor/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">KYC Verification</h1>
            <p className="text-muted-foreground">Complete your verification to start selling on Chopstack</p>
          </div>

          {/* Info Card */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Why KYC?</h3>
                  <p className="text-sm text-muted-foreground">
                    KYC verification helps us maintain a trusted marketplace. It protects both vendors and buyers by
                    ensuring all sellers are legitimate businesses or individuals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your business or farm name"
                    value={kycData.businessName}
                    onChange={(e) => setKycData({ ...kycData, businessName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={kycData.businessType}
                    onValueChange={(value) => setKycData({ ...kycData, businessType: value })}
                  >
                    <SelectTrigger id="businessType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual/Sole Proprietor</SelectItem>
                      <SelectItem value="registered">Registered Business</SelectItem>
                      <SelectItem value="cooperative">Cooperative</SelectItem>
                      <SelectItem value="farm">Farm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number (Optional)</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="CAC or BN number"
                      value={kycData.registrationNumber}
                      onChange={(e) => setKycData({ ...kycData, registrationNumber: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID (Optional)</Label>
                    <Input
                      id="taxId"
                      placeholder="TIN"
                      value={kycData.taxId}
                      onChange={(e) => setKycData({ ...kycData, taxId: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How can buyers and Chopstack reach you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={kycData.phoneNumber}
                    onChange={(e) => setKycData({ ...kycData, phoneNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    value={kycData.address}
                    onChange={(e) => setKycData({ ...kycData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Lagos"
                      value={kycData.city}
                      onChange={(e) => setKycData({ ...kycData, city: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="e.g., Lagos State"
                      value={kycData.state}
                      onChange={(e) => setKycData({ ...kycData, state: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>Upload documents to verify your identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idDocument">Government-issued ID</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">National ID, Driver's License, or Passport</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proofOfAddress">Proof of Address (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Utility bill or bank statement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Submit for Verification
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/vendor/dashboard">Cancel</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to our Terms & Conditions and Privacy Policy. We'll review your application
              within 24-48 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
