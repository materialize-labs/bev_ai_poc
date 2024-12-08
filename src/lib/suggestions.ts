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
  "I'm planning to create a nootropic focus drink.",
  "I want to develop an immunity-boosting juice line.",
  "I'm interested in launching a matcha energy drink brand.",
  "I want to create a line of prebiotic sodas.",
  "I'm thinking of developing a collagen beauty beverage.",
  "I want to launch an electrolyte hydration drink.",
  "I'm planning to create a CBD-infused beverage line.",
  "I want to develop a line of herbal tonics.",
  "I'm interested in creating a keto-friendly drink brand.",
  "I want to launch a line of vitamin-enhanced waters.",
  "I'm thinking about developing a hangover recovery drink.",
  "I want to create an ashwagandha calm drink."
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
  "College students seeking natural study aids and focus drinks.",
  "Remote workers looking for productivity-enhancing beverages.",
  "Outdoor enthusiasts who need portable, healthy hydration.",
  "Beauty-conscious consumers interested in collagen drinks.",
  "Keto diet followers seeking low-carb drink options.",
  "Pregnant women looking for healthy caffeine alternatives.",
  "Senior adults interested in cognitive health drinks.",
  "Creative professionals seeking inspiration and focus.",
  "Gamers looking for healthy energy alternatives.",
  "Plant-based consumers seeking dairy-free options.",
  "Intermittent fasters looking for zero-calorie drinks.",
  "Wellness influencers seeking next-generation beverages."
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
  "Mystical and ethereal with adaptogenic themes.",
  "Clinical and precise for science-backed benefits.",
  "Luxurious and indulgent for premium positioning.",
  "Retro-inspired with a healthy modern twist.",
  "Adventurous and outdoorsy for active lifestyles.",
  "Artistic and expressive for creative appeal.",
  "Minimalist Japanese-inspired aesthetic.",
  "Holistic and healing with ancient wisdom.",
  "Futuristic and sleek for next-gen appeal.",
  "Earthy and grounded with natural elements.",
  "Cosmic and ethereal for spiritual wellness.",
  "Playful and nostalgic with healthy updates."
]

// Formulation suggestions pool
const formulationPool = [
  "I want to create a tropical blend with mango, pineapple, and coconut water for natural hydration.",
  "I'm thinking of a berry-based drink with acai, blueberries, and goji berries for antioxidants.",
  "I want to combine green tea, mint, and lime for a refreshing energy boost.",
  "I'm interested in using adaptogens like ashwagandha and rhodiola with honey and lemon.",
  "I want to create a vanilla-lavender blend with chamomile for relaxation.",
  "I'm thinking of combining turmeric, ginger, and black pepper for an immunity boost.",
  "I want to use matcha green tea with almond milk and monk fruit sweetener.",
  "I'm interested in a coffee-based drink with MCT oil and collagen protein.",
  "I want to blend hibiscus, raspberry, and rose for a floral antioxidant drink.",
  "I'm thinking of using lion's mane mushroom with cacao and cinnamon.",
  "I want to create a citrus energy blend with orange, yuzu, and B-vitamins.",
  "I'm interested in combining pomegranate, beetroot, and tart cherry for recovery.",
  "I want to use passion fruit, guava, and green tea for a tropical energy boost.",
  "I'm thinking of a cucumber, mint, and aloe vera blend for hydration.",
  "I want to create a prebiotic drink with apple, ginger, and kombucha.",
  "I'm interested in using reishi mushroom with cacao and maca root.",
  "I want to blend spirulina, mint, and lime for a natural energy drink.",
  "I'm thinking of combining elderberry, zinc, and vitamin C for immunity.",
  "I want to use yerba mate with peach and ginseng for sustained energy.",
  "I'm interested in a protein-rich blend with pea protein, banana, and cinnamon.",
  "I want to create a nootropic drink with L-theanine, lion's mane, and green tea.",
  "I'm thinking of using coconut water, aloe vera, and electrolytes for hydration.",
  "I want to blend hemp seeds, cacao, and adaptogenic mushrooms.",
  "I'm interested in a probiotic drink with kefir, berries, and honey.",
  "I want to create a calming blend with lemon balm, passionflower, and chamomile."
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
  "Let's discuss manufacturing partnerships and costs.",
  "Can we detail the social media marketing plan?",
  "I want to explore retail partnership opportunities.",
  "Let's analyze the supply chain logistics.",
  "Can we develop the sustainability initiatives?",
  "I'd like to outline the R&D roadmap.",
  "Let's explore international expansion possibilities.",
  "Can we detail the customer acquisition strategy?",
  "I want to refine the brand positioning strategy.",
  "Let's analyze the working capital requirements.",
  "Can we explore strategic partnership opportunities?",
  "I'd like to detail the quality control processes."
]

function getRandomSuggestions(pool: string[], count: number = 3): string[] {
  // Create a copy of the pool to avoid modifying the original
  const available = [...pool]
  const selected: string[] = []

  // Select random items until we have enough or run out
  while (selected.length < count && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length)
    selected.push(available[randomIndex])
    available.splice(randomIndex, 1)
  }

  return selected
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