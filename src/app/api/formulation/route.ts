import { NextResponse } from 'next/server'
import { OpenAIStream } from '@/lib/openai-stream'
import { generateFormulation } from '@/lib/openai'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const { messages, previousSteps } = await request.json()

    if (!messages || !previousSteps) {
      return NextResponse.json(
        { error: 'Messages and previous steps are required' },
        { status: 400 }
      )
    }

    // Generate formulation with context from previous steps
    const completion = await generateFormulation({
      messages,
      marketResearch: previousSteps.marketResearch,
      consumerPersona: previousSteps.consumerPersona,
      brandName: previousSteps.brandName,
    })

    const stream = OpenAIStream(completion)
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Formulation API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process formulation request' },
      { status: 500 }
    )
  }
} 