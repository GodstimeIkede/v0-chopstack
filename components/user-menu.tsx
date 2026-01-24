"use client"

import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, LayoutDashboard, Wallet, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Profile {
  user_type: "buyer" | "vendor"
  full_name: string | null
  email: string
}

export function UserMenu() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { user, signOut } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (!user || !supabase) {
      setProfile(null)
      setIsLoading(false)
      return
    }

    async function loadProfile() {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("user_type, full_name, email")
          .eq("id", user.id)
          .single()

        if (data) {
          setProfile(data)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error("[v0] Error loading profile:", error)
        setProfile(null)
      }
      setIsLoading(false)
    }

    loadProfile()
  }, [user, supabase])

  const handleLogout = async () => {
    try {
      console.log("[v0] UserMenu logout initiated")
      await signOut()
      setProfile(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  const handleDashboard = () => {
    if (profile?.user_type === "vendor") {
      router.push("/vendor/dashboard")
    } else {
      router.push("/buyer/dashboard")
    }
  }

  const handleWallet = () => {
    router.push("/wallet")
  }

  const handleOrders = () => {
    if (profile?.user_type === "vendor") {
      router.push("/vendor/orders")
    } else {
      router.push("/buyer/orders")
    }
  }

  if (!profile || isLoading) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.full_name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDashboard}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWallet}>
          <Wallet className="mr-2 h-4 w-4" />
          Wallet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOrders}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Orders
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
