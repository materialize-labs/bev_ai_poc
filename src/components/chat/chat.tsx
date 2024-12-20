"use client"

import { useEffect, useRef, useState } from "react"
import { Message } from "./message"
import { ChatInput } from "./chat-input"
import { nanoid } from "nanoid"

interface ChatProps {
  initialMessages?: Message[]
  onSubmit: (message: string) => Promise<void>
  isStreaming: boolean
  suggestedPrompts?: string[]
  error?: string | null
}

export function Chat({
  initialMessages = [],
  onSubmit,
  isStreaming,
  suggestedPrompts = [],
  error,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Add a new message to the chat
  const addMessage = async (content: string) => {
    const newMessage: Message = {
      id: nanoid(),
      content,
      role: "user",
      createdAt: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    await onSubmit(content)
  }

  // Update messages when initialMessages changes
  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-[400px] flex-col rounded-lg border bg-background sm:h-[600px]">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <div className="border-t p-2 sm:p-4">
        <ChatInput
          onSubmit={addMessage}
          isLoading={isStreaming}
          suggestedPrompts={suggestedPrompts}
        />
      </div>
    </div>
  )
} 