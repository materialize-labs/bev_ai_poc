"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username")
    const password = formData.get("password")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        // Trigger a storage event for the Shell component
        window.localStorage.setItem('login', Date.now().toString())
        const from = searchParams.get("from") || "/create"
        router.push(from)
        router.refresh()
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-muted-foreground">
          Enter your credentials to continue
        </p>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              name="username"
              type="text"
              placeholder="Username"
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
} 