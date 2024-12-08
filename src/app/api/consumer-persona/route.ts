import { NextResponse } from 'next/server';
import { OpenAIStream } from '@/lib/openai-stream';
import { generateConsumerPersona } from '@/lib/openai';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const completion = await generateConsumerPersona(description);
    const stream = OpenAIStream(completion);
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Consumer Persona API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate consumer persona' },
      { status: 500 }
    );
  }
} 