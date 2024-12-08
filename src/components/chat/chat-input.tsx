"use client"

import { useRef, useState } from "react"
import { SendHorizontal } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "@/components/ui/button"
import { SuggestedPrompts } from "./suggested-prompts"

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>
  isLoading: boolean
  suggestedPrompts?: string[]
}

export function ChatInput({ onSubmit, isLoading, suggestedPrompts = [] }: ChatInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput("")
    await onSubmit(message)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden border-t bg-background px-2 sm:rounded-md sm:border sm:px-8">
      <SuggestedPrompts
        prompts={suggestedPrompts}
        onSelect={handleSuggestedPrompt}
        className="py-2 sm:py-4"
      />
      <TextareaAutosize
        ref={inputRef}
        tabIndex={0}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        spellCheck={false}
        className="min-h-[48px] w-full resize-none bg-transparent px-2 py-3 text-sm focus-within:outline-none sm:min-h-[60px] sm:px-4 sm:py-[1.3rem] sm:text-base"
        disabled={isLoading}
      />
      <div className="absolute right-4 top-2 sm:right-8 sm:top-4">
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          onClick={handleSubmit}
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
} 