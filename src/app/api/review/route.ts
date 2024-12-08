import { NextResponse } from 'next/server'
import { OpenAIStream } from '@/lib/openai-stream'
import { generateReview } from '@/lib/openai'

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

    // Generate review with context from all previous steps
    const completion = await generateReview({
      messages,
      marketResearch: previousSteps.marketResearch,
      consumerPersona: previousSteps.consumerPersona,
      brandName: previousSteps.brandName,
      formulation: previousSteps.formulation,
      businessPlan: previousSteps.businessPlan,
      mockupData: previousSteps.mockupData,
      brandIdentity: previousSteps.brandIdentity,
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
    console.error('Review API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process review request' },
      { status: 500 }
    )
  }
}