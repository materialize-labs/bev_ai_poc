import { NextResponse } from 'next/server';
import { generateLogo } from '@/lib/openai';

export const runtime = 'edge';

interface MockupRequest {
  logoUrl: string;
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
    const { logoUrl, brandName, containerType, colors, category, theme } = await request.json() as MockupRequest;

    if (!logoUrl || !brandName || !containerType || !colors || !category || !theme) {
      return NextResponse.json(
        { error: 'All parameters are required' },
        { status: 400 }
      );
    }

    // Create a detailed prompt for the mockup
    const prompt = `Create a photorealistic product mockup of a ${category} beverage ${containerType}.

Key Elements:
- Brand: "${brandName}"
- Container: Professional ${containerType} design with modern appeal
- Colors: Primary (${colors.primary}), Secondary (${colors.secondary}), Accent (${colors.accent})
- Style: Clean, premium, commercial product photography
- Theme: ${theme}

Requirements:
- Show the ${containerType} at a 3/4 angle with professional studio lighting
- Apply the brand colors in a sleek, modern design
- Include subtle reflections and shadows for realism
- Place the product on a clean, minimal surface
- Add depth of field effect for professional look
- Ensure the design looks premium and retail-ready
- Make it look like a real product you'd find in a store

Note: This should look like a professional product photo of a real beverage ${containerType} that could be on store shelves today.`;

    // Generate the mockup using DALL-E
    const mockupUrl = await generateLogo(prompt); // Reusing the generateLogo function as it handles DALL-E calls

    // Return both the prompt and the mockup URL
    return NextResponse.json({ prompt, mockupUrl });
  } catch (error) {
    console.error('Mockup Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate mockup' },
      { status: 500 }
    );
  }
} 