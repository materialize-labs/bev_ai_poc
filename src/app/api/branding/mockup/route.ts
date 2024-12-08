import { NextResponse } from 'next/server';
import { generateMockup } from '@/lib/openai';

export const runtime = 'edge';

interface MockupRequest {
  brandName: string;
  containerType: 'can' | 'bottle' | 'tetra';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  category: string;
  theme: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as MockupRequest;
    const { brandName, containerType, colors, category, theme } = body;

    const result = await generateMockup({
      brandName,
      containerType,
      colors,
      category,
      theme,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Mockup Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate mockup' },
      { status: 500 }
    );
  }
} 