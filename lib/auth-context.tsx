"use client"

import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      return
    }

    // Check initial auth state
    async function checkAuth() {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()
        setUser(currentUser || null)
      } catch (error) {
        console.error("[v0] Error checking auth:", error)
        setUser(null)
      }
      setIsLoading(false)
    }

    checkAuth()

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("[v0] Auth state changed:", _event, session?.user?.email)
      setUser(session?.user || null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    if (!supabase) return
    try {
      console.log("[v0] Signing out...")
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("[v0] Sign out error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
