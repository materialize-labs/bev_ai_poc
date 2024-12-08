import OpenAI from 'openai';
import { TEST_MODE, TEST_RESPONSES, streamTestContent, simulateDelay } from './test-data';

if (!process.env.OPENAI_API_KEY && !TEST_MODE) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMarketResearch(category: string) {
  if (TEST_MODE) {
    return streamTestContent(TEST_RESPONSES.marketResearch);
  }

  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a beverage industry expert providing market research insights. Format your response in markdown with clear sections for market overview, consumer segments, competition, and opportunities.`
      },
      {
        role: "user",
        content: `Provide a detailed market analysis for the ${category} beverage category. Include:

# Market Analysis: ${category} Category

## 1. Market Overview
- Current market size and growth
- Key segments and trends
- Price point analysis
- Distribution channels

## 2. Consumer Segments
- Primary demographics
- Key behaviors and preferences
- Emerging trends
- Target markets

## 3. Competition Analysis
- Major players
- Market gaps
- Competitive advantages
- Entry barriers

## 4. Opportunities
- Underserved segments
- Emerging needs
- Positioning opportunities
- Growth potential

## 5. Next Steps
Strategic recommendations for market entry`
      }
    ],
    temperature: 0.7,
    stream: true,
  });
}

export async function generateConsumerPersona(description: string) {
  if (TEST_MODE) {
    return streamTestContent(TEST_RESPONSES.consumerPersona);
  }

  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a consumer insights expert specializing in beverage market analysis. Format your response in markdown with clear sections for demographics, lifestyle, behaviors, and pain points.`
      },
      {
        role: "user",
        content: `Based on this description: "${description}", create a detailed consumer persona using this format:

# Target Consumer Persona: [Persona Name]

## Demographics
- Age range
- Location
- Occupation
- Income level

## Lifestyle
- Values and priorities
- Daily routines
- Social activities
- Health/wellness focus

## Behaviors
- Shopping habits
- Brand preferences
- Media consumption
- Price sensitivity

## Pain Points
- Current frustrations
- Unmet needs
- Purchase barriers
- Product preferences`
      }
    ],
    temperature: 0.7,
    stream: true,
  });
}

export async function generateBrandNames(theme: string, category: string, targetAudience: string) {
  if (TEST_MODE) {
    return streamTestContent(TEST_RESPONSES.brandNames);
  }

  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a creative branding expert specializing in beverage brand development. Create unique, memorable brand names that resonate with target audiences and reflect brand values. Format your response in markdown with exactly three brand suggestions.`
      },
      {
        role: "user",
        content: `Create 3 unique brand name suggestions for a ${category} beverage brand with these requirements:
- Theme/Values: ${theme}
- Target Audience: ${targetAudience}

Format each suggestion exactly like this:

### Brand Suggestion 1

#### Brand Name
**[Name]**
- Pronunciation: "[pronunciation guide]"
- Available Domains: [domain suggestions]

#### Brand Story
[2-3 sentences about meaning and connection to theme]

#### Market Fit
- Target Appeal: [audience resonance]
- Category Fit: [differentiation]
- Trademark Potential: [viability]

#### Visual Identity
- Logo Style: [style description]
- Colors: [color palette]
- Typography: [font style]

### Brand Suggestion 2
[Repeat same format]

### Brand Suggestion 3
[Repeat same format]`
      }
    ],
    temperature: 0.9,
    stream: true,
  });
}

export async function generateLogoPrompt(brandName: string, theme: string, category: string, targetAudience: string) {
  if (TEST_MODE) {
    return streamTestContent(TEST_RESPONSES.logoPrompt);
  }

  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a professional logo designer specializing in beverage brands. Create detailed, specific DALL-E prompts that will generate modern, professional beverage logos.`
      },
      {
        role: "user",
        content: `Create a detailed DALL-E prompt for a logo design with these requirements:
- Brand Name: ${brandName}
- Category: ${category}
- Theme/Values: ${theme}
- Target Audience: ${targetAudience}

The prompt should specify:
- Overall style and composition
- Color palette
- Typography style
- Key visual elements
- Mood and feeling
- Professional quality markers

Format as a clear, detailed paragraph optimized for DALL-E 3.`
      }
    ],
    temperature: 0.8,
    stream: true,
  });
}

export async function generateLogo(prompt: string) {
  if (TEST_MODE) {
    await simulateDelay();
    return TEST_RESPONSES.logoUrl;
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Create a professional beverage brand logo: ${prompt}`,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "natural",
  });

  return response.data[0].url;
} 