"use client"

import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"

interface SuggestedPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
  className?: string
}

export function SuggestedPrompts({
  prompts,
  onSelect,
  className = "",
}: SuggestedPromptsProps) {
  if (!prompts.length) return null

  return (
    <div className={`space-y-1 sm:space-y-2 ${className}`}>
      <div className="flex items-center gap-1 sm:gap-2">
        <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs text-muted-foreground sm:text-sm">Suggested messages:</span>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {prompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={() => onSelect(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  )
} 