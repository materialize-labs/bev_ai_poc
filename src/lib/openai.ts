import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMarketResearch(category: string) {
  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a beverage industry expert providing market research insights.
        Your analysis should help guide the user toward understanding their target market and consumer persona.
        Focus on identifying clear market segments and consumer demographics that could be explored further.`
      },
      {
        role: "user",
        content: `Provide a detailed market analysis for the ${category} beverage category, including:

        1. Market Overview
        - Current market size and growth trends
        - Key market segments
        - Price points and positioning

        2. Consumer Segments
        - Primary consumer demographics
        - Key consumer behaviors and preferences
        - Emerging consumer trends
        - Potential target markets to consider

        3. Competition Analysis
        - Major players and their positioning
        - Target audience of key competitors
        - Gaps in the market

        4. Opportunities
        - Underserved demographics
        - Emerging consumer needs
        - Market gaps to exploit
        - Potential positioning strategies

        5. Next Steps
        - Recommended consumer segments to focus on
        - Key demographics to consider for persona development
        - Important factors to consider when defining target audience

        Please format the response in a clear, structured way using markdown.
        End with specific suggestions for consumer persona development.`
      }
    ],
    temperature: 0.7,
    stream: true,
  });
}

export async function generateConsumerPersona(description: string) {
  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a consumer insights expert creating detailed customer personas. 
        Extract key demographic information from the user's description and create a rich, detailed persona.
        Focus on creating a realistic, actionable persona that beverage brands can use for targeting.`
      },
      {
        role: "user",
        content: `Create a detailed consumer persona based on this description: "${description}"

        Include:
        1. A catchy persona name that represents this demographic
        2. Key demographics (age, location, occupation, etc.)
        3. Lifestyle and daily routines
        4. Shopping behaviors and preferences
        5. Brand affinities and values
        6. Beverage consumption habits
        7. Pain points and needs
        8. Marketing channels to reach them

        Format the response in markdown for better readability.`
      }
    ],
    temperature: 0.7,
    stream: true,
  });
}

export async function generateBrandNames(theme: string, category: string, targetAudience: string) {
  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a creative branding expert specializing in beverage brand names.
        Generate brand names that are memorable, unique, and resonate with the target audience.
        Format your response in a consistent, structured way for easy parsing.
        Each brand suggestion should follow the exact format specified in the user's prompt.`
      },
      {
        role: "user",
        content: `Create 5 unique brand names for a ${category} beverage brand.

Theme/Values: ${theme}
Target Audience: ${targetAudience}

Format each brand suggestion exactly as follows:

### Brand Suggestion 1
1. The Brand Name
[Brand Name]
- Pronunciation: [How to pronounce it]
- Available Domains: [.com, .co suggestions]

2. Brand Story
[2-3 sentences about the brand's meaning and connection to the theme/values]

3. Market Fit
- Target Appeal: [How it appeals to the target audience]
- Category Fit: [How it stands out in the category]
- Trademark Potential: [Initial trademark viability]

4. Visual Identity
- Logo Style: [Suggested logo style]
- Colors: [Color palette suggestions]
- Typography: [Font style recommendations]

[Repeat format for remaining 4 brand suggestions]

Note: Ensure each brand name is:
- Memorable and unique
- Easy to pronounce and spell
- Available for trademark/domain registration
- Relevant to the ${category} category
- Resonant with ${targetAudience}`
      }
    ],
    temperature: 0.9,
    stream: true,
  });
}

export async function generateFormulation(attributes: {
  type: string;
  flavor: string;
  benefits: string[];
  restrictions: string[];
}) {
  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: "You are a beverage formulation expert with deep knowledge of ingredients and nutrition."
      },
      {
        role: "user",
        content: `Create a beverage formulation with the following attributes:
        Type: ${attributes.type}
        Flavor Profile: ${attributes.flavor}
        Desired Benefits: ${attributes.benefits.join(', ')}
        Dietary Restrictions: ${attributes.restrictions.join(', ')}
        
        Include:
        1. Key ingredients with quantities
        2. Nutritional information per serving
        3. Functional benefits
        4. Production considerations
        
        Format the response in markdown for better readability.`
      }
    ],
    temperature: 0.7,
    stream: true,
  });
}

export async function generateLogoPrompt(brandName: string, theme: string, category: string, targetAudience: string) {
  return await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a professional logo designer creating DALL-E prompts for beverage brand logos.
        Focus on creating designs that will resonate with the target audience and stand out on store shelves.
        Consider both digital and physical applications of the logo.`
      },
      {
        role: "user",
        content: `Create a detailed DALL-E prompt for a logo design with these parameters:
        Brand Name: ${brandName}
        Theme/Values: ${theme}
        Category: ${category}
        Target Audience: ${targetAudience}
        
        The prompt should describe:
        1. Style and Aesthetic
        - Overall design approach
        - Key visual elements
        - Cultural influences
        
        2. Color Scheme
        - Primary colors
        - Secondary colors
        - Color psychology considerations
        
        3. Typography
        - Font style suggestions
        - Text placement
        - Hierarchy and scale
        
        4. Composition
        - Layout and balance
        - Negative space usage
        - Scalability considerations
        
        5. Brand Elements
        - Iconic elements
        - Symbolic representations
        - Visual metaphors
        
        Format the response to work optimally with DALL-E 3.
        Focus on creating a design that:
        - Appeals to the target demographic
        - Stands out on store shelves
        - Works well across different sizes
        - Conveys brand values effectively`
      }
    ],
    temperature: 0.8,
    stream: true,
  });
}

export async function generateLogo(prompt: string) {
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