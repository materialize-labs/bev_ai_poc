import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname === '/login'
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/create') || 
    (request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/api/auth'))
  
  // Get the auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value
  const isAuthenticated = !!authToken

  // Store the original URL to redirect after login
  const originalUrl = request.nextUrl.pathname + request.nextUrl.search

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', originalUrl)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/create', request.url))
  }

  return NextResponse.next()
}

// Update matcher to catch all variations of /create
export const config = {
  matcher: [
    '/create',
    '/create/:path*',
    '/api/:path*',
    '/login'
  ]
} 