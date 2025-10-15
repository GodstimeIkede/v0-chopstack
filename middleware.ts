import { updateSession } from "@/lib/supabase/middleware"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/wallet", "/buyer", "/vendor"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute) {
    const response = await updateSession(request)

    // Check if user is authenticated
    const supabase = response.locals?.supabase
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
    }

    return response
  }

  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
