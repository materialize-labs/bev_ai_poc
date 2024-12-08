"use client"

import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: Date
}

interface MessageProps {
  message: Message
  isStreaming?: boolean
}

export function Message({ message, isStreaming }: MessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 px-4 py-8",
        message.role === "assistant" ? "bg-muted/50" : "bg-background"
      )}
    >
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {message.role === "assistant" ? (
          <Bot className="size-4" />
        ) : (
          <User className="size-4" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <ReactMarkdown
          components={{
            pre: ({ node, ...props }) => (
              <div className="relative my-4 overflow-hidden rounded-lg border bg-background p-4">
                <pre {...props} />
              </div>
            ),
            code: ({ node, ...props }) => (
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-inside list-disc space-y-2 py-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-inside list-decimal space-y-2 py-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="marker:text-foreground/50" {...props} />
            ),
          }}
          className="prose prose-muted dark:prose-invert max-w-none space-y-4 break-words prose-p:leading-relaxed prose-pre:p-0"
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  )
} 