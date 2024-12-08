// Market Research suggestions pool
const marketResearchPool = [
  "I want to create a natural energy drink with clean ingredients.",
  "I'm thinking of launching a premium sparkling water brand.",
  "I want to develop a plant-based protein beverage.",
  "I'm interested in creating a functional wellness tea drink.",
  "I want to launch a probiotic kombucha line.",
  "I'm planning to develop a sports recovery drink.",
  "I want to create a line of cold-brew coffee beverages.",
  "I'm interested in developing a zero-sugar soda alternative.",
  "I want to launch a line of adaptogenic elixirs.",
  "I'm thinking about creating a kids' healthy drink brand.",
  "I want to develop a premium coconut water brand.",
  "I'm interested in creating functional mushroom beverages.",
  "I want to launch a line of botanical sparkling drinks.",
]

// Consumer Persona suggestions pool
const consumerPersonaPool = [
  "Health-conscious millennials who are looking for natural energy alternatives.",
  "Active professionals aged 25-40 who value premium, sustainable products.",
  "Fitness enthusiasts who need clean, functional beverages for their workouts.",
  "Urban professionals seeking healthy alternatives to traditional energy drinks.",
  "Wellness-focused individuals interested in functional benefits.",
  "Health-conscious parents looking for better options for their kids.",
  "Young professionals who prioritize organic and natural ingredients.",
  "Athletes and sports enthusiasts seeking performance beverages.",
  "Mindful consumers interested in sustainable and ethical products.",
  "Busy professionals looking for convenient health solutions.",
  "Yoga and meditation practitioners seeking mindful beverages.",
  "Health-conscious Gen Z consumers interested in innovative drinks.",
  "Eco-conscious millennials who value sustainable packaging.",
]

// Branding suggestions pool
const brandingPool = [
  "Modern, minimalist, and premium with a focus on wellness and sustainability.",
  "Bold, energetic, and vibrant with an emphasis on natural ingredients.",
  "Clean, pure, and refreshing with a connection to nature and mindfulness.",
  "Sophisticated and elegant targeting premium wellness consumers.",
  "Playful and vibrant appealing to health-conscious young adults.",
  "Scientific and trustworthy focusing on functional benefits.",
  "Eco-friendly and sustainable with earth-toned aesthetics.",
  "Athletic and dynamic targeting sports enthusiasts.",
  "Zen and calming with a focus on mental wellness.",
  "Urban and contemporary with a health-conscious edge.",
  "Natural and organic with botanical influences.",
  "Tech-forward and innovative in the wellness space.",
  "Traditional with a modern wellness twist.",
]

// Formulation suggestions pool
const formulationPool = [
  "A refreshing blend with natural caffeine from green tea, B-vitamins, and adaptogens.",
  "A sparkling water infused with organic fruit essences and electrolytes.",
  "A plant protein shake with pea protein, MCT oil, and natural sweeteners.",
  "An adaptogenic elixir with mushroom extracts and herbs.",
  "A probiotic drink with natural fruit flavors.",
  "A recovery drink with BCAAs and electrolytes.",
  "A zero-sugar energy drink with natural stimulants.",
  "A functional tea with nootropic ingredients.",
  "A collagen-infused beauty beverage.",
  "A prebiotic gut health drink.",
  "A vitamin-enriched hydration beverage.",
  "An immune-boosting wellness shot.",
  "A natural focus and clarity drink.",
]

// Business Plan suggestions pool
const businessPlanPool = [
  "I'd like to modify the financial projections to be more conservative.",
  "Let's expand the marketing strategy section with more detail.",
  "Can we adjust the distribution channels and timeline?",
  "I want to refine the competitive analysis section.",
  "Let's focus on optimizing the operational costs.",
  "Can we explore alternative marketing channels?",
  "I'd like to adjust the growth projections.",
  "Let's detail the e-commerce strategy further.",
  "Can we expand on the risk mitigation strategies?",
  "I want to refine the target market segments.",
  "Let's adjust the pricing strategy.",
  "Can we explore additional revenue streams?",
  "I'd like to modify the launch timeline.",
]

function getRandomSuggestions(pool: string[], count: number = 3): string[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getMarketResearchSuggestions(): string[] {
  return getRandomSuggestions(marketResearchPool)
}

export function getConsumerPersonaSuggestions(): string[] {
  return getRandomSuggestions(consumerPersonaPool)
}

export function getBrandingSuggestions(): string[] {
  return getRandomSuggestions(brandingPool)
}

export function getFormulationSuggestions(): string[] {
  return getRandomSuggestions(formulationPool)
}

export function getBusinessPlanSuggestions(): string[] {
  return getRandomSuggestions(businessPlanPool)
} 