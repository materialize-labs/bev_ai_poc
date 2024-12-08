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
  "What are the key active ingredients you'd like to include in your formulation?",
  "How would you like to balance taste with functional benefits in your beverage?",
  "What natural sweeteners or flavoring agents would you prefer to use?",
  "Are there any specific dietary restrictions we should consider (vegan, gluten-free, etc.)?",
  "What's your target nutritional profile (calories, sugar, protein content)?",
  "Would you like to incorporate any specific vitamins or minerals?",
  "What's your preferred base liquid (water, tea, juice, plant milk)?",
  "Are there any specific preservatives or shelf-life requirements?",
  "Would you like to add any texture enhancers or stabilizers?",
  "What's your target caffeine content, if any?",
  "Are there any specific certifications you're aiming for (organic, non-GMO)?",
  "What's your desired shelf life for the product?",
  "Would you like to include any specific functional ingredients for your target benefits?"
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
  // Use the current day of the month as a seed
  const date = new Date()
  const dayOfMonth = date.getDate()
  
  // Create a deterministic shuffle based on the day
  const shuffled = [...pool].sort((a, b) => {
    const hashA = a.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * dayOfMonth
    const hashB = b.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * dayOfMonth
    return hashA - hashB
  })
  
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