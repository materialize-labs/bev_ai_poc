import { createParser } from "eventsource-parser"
import type { ChatCompletionChunk } from "openai/resources/chat/completions"
import type { Stream } from "openai/streaming"

export interface OpenAIStreamPayload {
  model: string
  messages: { role: string; content: string }[]
  temperature?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
  max_tokens?: number
  stream?: boolean
  n?: number
}

export function OpenAIStream(stream: Stream<ChatCompletionChunk>) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || ""
          const queue = encoder.encode(text)
          controller.enqueue(queue)
        }
      } catch (error) {
        controller.error(error)
      } finally {
        controller.close()
      }
    },
  })
} 