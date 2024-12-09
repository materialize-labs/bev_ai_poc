"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        // Clear the auth cookie from the client side
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;"
        // Trigger storage event for other components to detect the change
        window.localStorage.setItem('logout', Date.now().toString())
        router.push("/login")
        router.refresh()
      }
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  )
} 