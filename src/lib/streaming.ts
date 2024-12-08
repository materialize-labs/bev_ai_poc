export async function createStream(response: Response) {
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  let content = ""

  return {
    async *iterateStream() {
      try {
        while (true) {
          const { done, value } = await reader!.read()
          if (done) break

          const chunk = decoder.decode(value)
          content += chunk
          yield content
        }
      } finally {
        reader?.releaseLock()
      }
    },
    get content() {
      return content
    },
  }
}

export async function fetchStream(
  url: string,
  options: RequestInit,
  onChunk: (content: string) => void
) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Accept: "text/event-stream",
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Network response was not ok")
  }

  const stream = await createStream(response)
  for await (const content of stream.iterateStream()) {
    onChunk(content)
  }

  return stream.content
}