import { NextResponse } from 'next/server';
import { OpenAIStream } from '@/lib/openai-stream';
import { generateBrandNames, generateLogoPrompt, generateLogo } from '@/lib/openai';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { theme, category, targetAudience, brandName } = await request.json();

    if (!theme || !category || !targetAudience) {
      return NextResponse.json(
        { error: 'Theme, category, and target audience are required' },
        { status: 400 }
      );
    }

    // If brandName is provided, generate logo
    if (brandName) {
      const logoPromptCompletion = await generateLogoPrompt(brandName, theme, category, targetAudience);
      const stream = OpenAIStream(logoPromptCompletion);
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Otherwise, generate brand names
    const completion = await generateBrandNames(theme, category, targetAudience);
    const stream = OpenAIStream(completion);
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Branding API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate branding assets' },
      { status: 500 }
    );
  }
} 