import { createParser } from "eventsource-parser"
import type { ChatCompletionChunk } from "openai/resources/chat/completions"
import type { Stream } from "openai/streaming"
import { TEST_MODE } from "./test-data"

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

export function OpenAIStream(stream: Stream<ChatCompletionChunk> | AsyncGenerator<string, void, unknown>) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  return new ReadableStream({
    async start(controller) {
      try {
        if (TEST_MODE) {
          // Handle test mode streaming
          const testStream = stream as AsyncGenerator<string, void, unknown>
          for await (const chunk of testStream) {
            const queue = encoder.encode(chunk)
            controller.enqueue(queue)
          }
        } else {
          // Handle OpenAI streaming
          const openAIStream = stream as Stream<ChatCompletionChunk>
          for await (const chunk of openAIStream) {
            const text = chunk.choices[0]?.delta?.content || ""
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          }
        }
      } catch (error) {
        console.error("Streaming error:", error)
        controller.error(error)
      } finally {
        controller.close()
      }
    },
  })
} 