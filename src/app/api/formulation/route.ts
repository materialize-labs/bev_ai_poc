import { NextResponse } from 'next/server';
import { generateFormulation } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const attributes = await request.json();

    if (!attributes.type || !attributes.flavor || !attributes.benefits || !attributes.restrictions) {
      return NextResponse.json(
        { error: 'All formulation attributes are required' },
        { status: 400 }
      );
    }

    const formulation = await generateFormulation(attributes);

    return NextResponse.json({ result: formulation });
  } catch (error) {
    console.error('Formulation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate formulation' },
      { status: 500 }
    );
  }
} 