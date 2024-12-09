import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (
    username === process.env.AUTH_USERNAME &&
    password === process.env.AUTH_PASSWORD
  ) {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64')
    
    // Create the response
    const response = NextResponse.json({ success: true })

    // Set the cookie in the response
    response.cookies.set({
      name: 'auth_token',
      value: authToken,
      httpOnly: false, // Make it accessible to client-side JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  )
} 