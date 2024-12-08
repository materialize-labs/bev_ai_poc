// Mock responses for testing without hitting the OpenAI API
export const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === 'true'

export const TEST_RESPONSES = {
  marketResearch: `# Market Analysis: Energy Drink Category

## 1. Market Overview
- Current market size: $57.4B globally
- Growth rate: 8.2% CAGR
- Key segments: Traditional, Natural/Organic, Sports Performance
- Price points: Premium ($3.99-4.99), Mid-range ($2.49-3.49), Value ($1.49-1.99)

## 2. Consumer Segments
- Primary demographics: Gen Z and Millennials (18-34)
- Key behaviors: Health-conscious, active lifestyle
- Emerging trends: Natural ingredients, functional benefits
- Target markets: Fitness enthusiasts, busy professionals

## 3. Competition Analysis
- Major players: Red Bull, Monster, Rockstar
- Gaps: Natural energy, mental focus, wellness

## 4. Opportunities
- Underserved: Health-conscious professionals
- Emerging needs: Clean energy, mental clarity
- Positioning: Premium, natural, functional

## 5. Next Steps
Focus on health-conscious urban professionals who want natural energy solutions.`,

  consumerPersona: `# Target Consumer Persona: The Mindful Achiever

## Demographics
- Age: 25-35
- Location: Urban areas
- Occupation: Young professionals
- Income: $75,000-120,000

## Lifestyle
- Health-conscious
- Career-focused
- Regular exercise
- Values work-life balance

## Behaviors
- Shops at Whole Foods, Trader Joe's
- Uses fitness apps
- Follows wellness influencers
- Willing to pay premium for quality

## Pain Points
- Afternoon energy crashes
- Limited healthy energy options
- Busy schedule
- Concerns about artificial ingredients`,

  brandNames: `### Brand Suggestion 1
1. The Brand Name
Zenergy
- Pronunciation: "ZEN-er-jee"
- Available Domains: zenergy.co, drinkzenergy.com

2. Brand Story
Combines "Zen" and "Energy" to represent balanced, mindful energy. Perfect for those seeking clarity and focus without the jitters.

3. Market Fit
- Target Appeal: Resonates with health-conscious professionals
- Category Fit: Stands out in the natural energy segment
- Trademark Potential: High viability, unique in beverage space

4. Visual Identity
- Logo Style: Minimalist, geometric
- Colors: Sage green, cool gray, white
- Typography: Clean sans-serif

### Brand Suggestion 2
1. The Brand Name
Elevate
- Pronunciation: "EL-eh-vayt"
- Available Domains: drinkelevate.co, elevatedrinks.com

2. Brand Story
Represents rising above ordinary energy drinks. Empowers achievers to reach their peak performance naturally.

3. Market Fit
- Target Appeal: Perfect for ambitious professionals
- Category Fit: Premium positioning in natural segment
- Trademark Potential: May need specific variation

4. Visual Identity
- Logo Style: Upward flowing, dynamic
- Colors: Deep blue, silver, white
- Typography: Modern, bold sans-serif`,

  logoPrompt: `Creating a minimalist, premium logo for Zenergy, a natural energy drink brand targeting health-conscious professionals. The design should convey clarity, focus, and natural energy.

Key elements:
- Clean, geometric shapes
- Balanced composition
- Natural color palette
- Modern typography
- Subtle energy symbolism`,

  logoUrl: "https://placehold.co/1024x1024/FAFAFA/333333?text=ZENERGY",

  mockupPrompt: `Creating a premium product mockup for Zenergy natural energy drink.

Key elements:
- Sleek aluminum can design
- Minimalist branding
- Premium finish
- Professional lighting
- Clean background
- Modern presentation`,

  mockupUrl: "https://placehold.co/1024x1024/FAFAFA/333333?text=ZENERGY+CAN"
}

// Helper function to simulate API delay (now instant)
export const simulateDelay = () => Promise.resolve();

// Helper function to stream test content
export async function* streamTestContent(content: string) {
  // Return entire content at once
  yield content;
} 