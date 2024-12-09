"use client"

import { ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { LogoutButton } from "@/components/logout-button"
import { usePathname } from 'next/navigation'

interface ShellProps {
  children: ReactNode
  className?: string
}

export function Shell({ children, className }: ShellProps) {
  const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true'
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()

  // Function to check authentication status
  function checkAuth() {
    // Get all cookies as a string
    const cookieString = document.cookie
    console.log('Raw cookies:', cookieString)

    // Parse cookies into an object
    const cookies = cookieString.split(';').reduce((acc, current) => {
      const [name, ...value] = current.trim().split('=')
      acc[name] = value.join('=') // Handle values that might contain =
      return acc
    }, {} as Record<string, string>)

    console.log('Parsed cookies:', cookies)
    console.log('Auth token:', cookies['auth_token'])

    const hasAuthToken = 'auth_token' in cookies && !!cookies['auth_token']
    console.log('Has auth token:', hasAuthToken)

    setIsAuthenticated(hasAuthToken)
  }

  useEffect(() => {
    // Initial check
    checkAuth()

    // Set up interval for periodic checks
    const interval = setInterval(checkAuth, 1000)

    // Listen for storage events
    const handleStorage = () => {
      console.log('Storage event triggered')
      checkAuth()
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorage)
    }
  }, [pathname])

  // Debug render
  console.log('Shell render:', { isAuthenticated, pathname })

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="mr-4 flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <span className="font-bold">Bev Brand AI</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              {isTestMode && (
                <Badge variant="secondary" className="font-mono">
                  TEST MODE
                </Badge>
              )}
              <ThemeToggle />
              {isAuthenticated && <LogoutButton />}
            </div>
          </div>
        </header>
        <main className={cn("flex-1", className)}>
          <div className="container relative">
            {children}
          </div>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-14">
            <p className="text-center text-sm leading-loose text-muted-foreground">
              Built by{" "}
              <a
                href="https://materializelabs.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Materialize Labs
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/materialize-labs/bev_ai_poc"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
} 