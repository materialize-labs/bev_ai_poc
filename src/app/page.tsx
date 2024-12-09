import Link from "next/link"
import { ArrowRight, Beaker, Brain, LineChart, Palette, Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Transform Your Beverage{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Brand Vision
          </span>{" "}
          into Reality
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          A secure, AI-powered platform for beverage brand development. From market research to business planning,
          we guide you through every step with intelligent assistance.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/create">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
          <div className="rounded-full border p-2">
            <LineChart className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Market Research</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered analysis of market trends, competition, and opportunities
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
          <div className="rounded-full border p-2">
            <Brain className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Consumer Personas</h3>
          <p className="text-sm text-muted-foreground">
            Detailed target audience profiles with behavioral insights
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
          <div className="rounded-full border p-2">
            <Palette className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Brand Identity</h3>
          <p className="text-sm text-muted-foreground">
            AI-generated brand names, stories, and product mockups
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
          <div className="rounded-full border p-2">
            <Beaker className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Product Development</h3>
          <p className="text-sm text-muted-foreground">
            Recipe formulation and nutritional guidance
          </p>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
          <div className="rounded-full border p-2">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Secure Platform</h3>
          <p className="text-sm text-muted-foreground">
            Protected workspace with authentication and data security
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
          <div className="rounded-full border p-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">Business Planning</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive business strategy and execution plans
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Define your beverage category and market",
            "Create detailed consumer personas",
            "Generate brand identity and mockups",
            "Get your business plan and next steps",
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                {index + 1}
              </div>
              <p className="text-sm">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
