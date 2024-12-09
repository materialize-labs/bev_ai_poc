import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

const AUTH_COOKIE = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export function validateCredentials(username: string, password: string): boolean {
  return (
    username === process.env.AUTH_USERNAME &&
    password === process.env.AUTH_PASSWORD
  );
}

export function setAuthCookie(): void {
  cookies().set(AUTH_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function getAuthStatus(request: NextRequest): boolean {
  return request.cookies.has(AUTH_COOKIE);
}

export function clearAuthCookie(): void {
  cookies().delete(AUTH_COOKIE);
} 