import { NextResponse } from 'next/server';
import { generateLogoPrompt, generateLogo } from '@/lib/openai';
import { OpenAIStream } from '@/lib/openai-stream';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { brandName, theme, category, targetAudience } = await request.json();

    if (!brandName || !theme || !category || !targetAudience) {
      return NextResponse.json(
        { error: 'All parameters are required' },
        { status: 400 }
      );
    }

    // First, generate the logo prompt
    const promptCompletion = await generateLogoPrompt(brandName, theme, category, targetAudience);
    const stream = OpenAIStream(promptCompletion);

    // Create a text decoder to read the stream
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let prompt = '';

    // Read the stream to get the complete prompt
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      prompt += decoder.decode(value);
    }

    // Generate the logo using the prompt
    const logoUrl = await generateLogo(prompt);

    // Return both the prompt and the logo URL
    return NextResponse.json({ prompt, logoUrl });
  } catch (error) {
    console.error('Logo Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate logo' },
      { status: 500 }
    );
  }
} 