export type BundleType = "kitchen" | "farm" | "livestock"

export type DeliveryStatus = "pending" | "shipped" | "delivered" | "completed"

export interface Bundle {
  id: string
  name: string
  description: string
  price: number
  type: BundleType
  items: BundleItem[]
  vendorId: string
  vendorName: string
  image: string
  rating?: number
  reviewCount?: number
}

export interface BundleItem {
  id: string
  name: string
  quantity: string
  unit: string
}

export interface Order {
  id: string
  bundleId: string
  bundleName: string
  buyerId: string
  vendorId: string
  vendorName: string
  price: number
  status: DeliveryStatus
  createdAt: Date
  deliveredAt?: Date
  items: BundleItem[]
}

export interface Wallet {
  balance: number
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: Date
}

export interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  verified: boolean
  rating: number
  totalSales: number
  subscriptionActive: boolean
  subscriptionEndDate?: Date
  kycCompleted: boolean
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  user_type: "buyer" | "vendor"

  // Vendor-specific fields
  business_name: string | null
  business_address: string | null
  kyc_status: "pending" | "verified" | "rejected"
  kyc_document_url: string | null
  kyc_id_number: string | null
  subscription_status: "free_trial" | "active" | "expired"
  subscription_expires_at: string | null
  commission_rate: number

  // Buyer-specific fields
  wallet_balance: number
  delivery_address: string | null

  created_at: string
  updated_at: string
}
