import { NextResponse } from 'next/server';
import { OpenAIStream } from '@/lib/openai-stream';
import { generateMarketResearch } from '@/lib/openai';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const completion = await generateMarketResearch(category);
    const stream = OpenAIStream(completion);
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Market Research API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate market research' },
      { status: 500 }
    );
  }
} 