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
        content: `You are a beverage industry expert providing market research insights.`
      },
      {
        role: "user",
        content: `Provide a detailed market analysis for the ${category} beverage category...`
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
        content: `You are a consumer insights expert...`
      },
      {
        role: "user",
        content: `Create a detailed consumer persona...`
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
        content: `You are a creative branding expert...`
      },
      {
        role: "user",
        content: `Create 5 unique brand names...`
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
        content: `You are a professional logo designer...`
      },
      {
        role: "user",
        content: `Create a detailed DALL-E prompt...`
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
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "natural",
  });

  return response.data[0].url;
} 