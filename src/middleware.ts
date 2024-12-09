import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthStatus } from '@/lib/auth'

export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = getAuthStatus(request)

  // If not authenticated and trying to access protected routes
  if (!isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure which routes to protect
export const config = {
  matcher: [
    '/create/:path*',
    '/api/((?!auth).*)' // Protect all API routes except /api/auth
  ]
} 