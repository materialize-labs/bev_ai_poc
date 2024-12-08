"use client"

import { useRef, useState } from "react"
import { SendHorizontal } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>
  isLoading: boolean
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
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

  return (
    <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden border-t bg-background px-4 sm:rounded-md sm:border sm:px-8">
      <TextareaAutosize
        ref={inputRef}
        tabIndex={0}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        spellCheck={false}
        className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        disabled={isLoading}
      />
      <div className="absolute right-8 top-4">
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          onClick={handleSubmit}
        >
          <SendHorizontal className="size-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
} 