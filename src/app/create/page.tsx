"use client"

import { useState } from "react"
import { useSteps } from "@/hooks/use-steps"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Chat } from "@/components/chat/chat"
import { fetchStream } from "@/lib/streaming"
import { nanoid } from "nanoid"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, Wine, Beer, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Message } from "@/components/chat/message"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const steps = [
  {
    id: "market-research",
    name: "Market Research",
    description: "Analyze market trends and competition",
  },
  {
    id: "consumer-persona",
    name: "Consumer Persona",
    description: "Define your target audience",
  },
  {
    id: "branding",
    name: "Branding",
    description: "Create your brand identity",
  },
  {
    id: "formulation",
    name: "Formulation",
    description: "Develop your product recipe",
  },
]

const createInitialMessage = (content: string): Message => ({
  id: nanoid(),
  role: "assistant",
  content,
  createdAt: new Date(),
})

const stepMessages = {
  "market-research": [
    createInitialMessage(
      "Hi! I'm your beverage brand development assistant. Let's start by analyzing the market for your beverage category. What type of beverage would you like to create?"
    ),
  ],
  "consumer-persona": [
    createInitialMessage(
      "Great! Now let's define your target consumer persona. Tell me about your ideal customer. Consider aspects like age range, lifestyle, interests, and purchasing habits."
    ),
  ],
  "branding": [
    createInitialMessage(
      "Excellent! Now let's create a unique brand identity. First, tell me about the key themes, values, or emotions you want your brand to convey. Consider your market research insights and target persona."
    ),
  ],
}

interface BrandName {
  name: string
  description: string
}

type ContainerType = 'can' | 'bottle' | 'tetra';

export default function CreatePage() {
  const {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
  } = useSteps(steps)

  const [marketResearchMessages, setMarketResearchMessages] = useState<Message[]>(() => [...stepMessages["market-research"]])
  const [personaMessages, setPersonaMessages] = useState<Message[]>(() => [...stepMessages["consumer-persona"]])
  const [brandingMessages, setBrandingMessages] = useState<Message[]>(() => [...stepMessages["branding"]])
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasResponse, setHasResponse] = useState(false)
  const [brandNames, setBrandNames] = useState<BrandName[]>([])
  const [selectedBrandName, setSelectedBrandName] = useState<string>("")
  const [showBrandSelection, setShowBrandSelection] = useState(false)

  // Store category and persona for use in branding
  const [category, setCategory] = useState("")
  const [persona, setPersona] = useState("")
  const [theme, setTheme] = useState("")

  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false)
  const [logoData, setLogoData] = useState<{ prompt: string; logoUrl: string } | null>(null)

  const [containerType, setContainerType] = useState<ContainerType>('can')
  const [isGeneratingMockup, setIsGeneratingMockup] = useState(false)
  const [mockupData, setMockupData] = useState<{ prompt: string; mockupUrl: string } | null>(null)

  const handleMarketResearch = async (message: string) => {
    try {
      setCategory(message) // Store category for later use
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: message,
        createdAt: new Date(),
      }
      setMarketResearchMessages((prev) => [...prev, userMessage])

      setIsStreaming(true)
      setHasResponse(false)

      const assistantMessageId = nanoid()
      setMarketResearchMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ])

      await fetchStream(
        "/api/market-research",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: message }),
        },
        (content) => {
          setMarketResearchMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content }
                : msg
            )
          )
        }
      )
      setHasResponse(true)
    } catch (error) {
      console.error("Market Research Error:", error)
    } finally {
      setIsStreaming(false)
    }
  }

  const handlePersona = async (message: string) => {
    try {
      setPersona(message) // Store persona for later use
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: message,
        createdAt: new Date(),
      }
      setPersonaMessages((prev) => [...prev, userMessage])

      setIsStreaming(true)
      setHasResponse(false)

      const assistantMessageId = nanoid()
      setPersonaMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ])

      await fetchStream(
        "/api/consumer-persona",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: message }),
        },
        (content) => {
          setPersonaMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content }
                : msg
            )
          )
        }
      )
      setHasResponse(true)
    } catch (error) {
      console.error("Consumer Persona Error:", error)
    } finally {
      setIsStreaming(false)
    }
  }

  const handleBranding = async (message: string) => {
    try {
      setTheme(message) // Store theme for later use
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: message,
        createdAt: new Date(),
      }
      setBrandingMessages((prev) => [...prev, userMessage])

      setIsStreaming(true)
      setHasResponse(false)
      setShowBrandSelection(false)

      const assistantMessageId = nanoid()
      setBrandingMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ])

      let content = ""
      try {
        await fetchStream(
          "/api/branding",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              theme: message,
              category,
              targetAudience: persona,
            }),
          },
          (chunk) => {
            content = chunk // Update the full content
            setBrandingMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: chunk }
                  : msg
              )
            )
          }
        )

        if (!content) {
          throw new Error('No content received from the API');
        }

        // Parse brand suggestions from the markdown response
        const suggestions = content.split('### Brand Suggestion').slice(1);
        
        if (suggestions.length === 0) {
          throw new Error('No brand suggestions found in the response');
        }

        const parsedBrandNames = suggestions.map(suggestion => {
          try {
            // Extract brand name (looking for the name between ** **)
            const nameMatch = suggestion.match(/\*\*([^*]+)\*\*/);
            if (!nameMatch?.[1]) {
              console.warn('Could not extract brand name from suggestion');
              return null;
            }

            // Get the name and clean up any markdown formatting
            const name = nameMatch[1].trim();

            // Extract everything after Brand Story for the description
            const descriptionMatch = suggestion.match(/#### Brand Story\n([\s\S]+?)(?=####|$)/);
            const description = descriptionMatch 
              ? descriptionMatch[1].trim()
              : 'A unique and memorable brand name for your beverage.';

            return {
              name,
              description: suggestion.trim() // Store the full markdown content
            };
          } catch (parseError) {
            console.error('Error parsing brand suggestion:', parseError);
            return null;
          }
        }).filter((brand): brand is BrandName => brand !== null && brand.name !== '');

        if (parsedBrandNames.length === 0) {
          throw new Error('No valid brand names could be parsed from the response');
        }

        setBrandNames(parsedBrandNames)
        setHasResponse(true)
        setShowBrandSelection(true)
      } catch (streamError) {
        console.error('Streaming or parsing error:', streamError);
        setBrandingMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: 'assistant',
            content: 'I encountered an error while generating brand suggestions. Please try again with different themes or values.',
            createdAt: new Date(),
          },
        ]);
        throw streamError; // Re-throw to be caught by outer catch block
      }
    } catch (error: unknown) {
      console.error("Branding Error:", error);
      
      // Type guard for Error objects
      const isErrorWithMessage = (error: unknown): error is Error => {
        return error instanceof Error;
      };

      // Don't add another error message if we already added one in the inner catch block
      if (!isErrorWithMessage(error) || !error.message.includes('while generating brand suggestions')) {
        setBrandingMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
            createdAt: new Date(),
          },
        ]);
      }
    } finally {
      setIsStreaming(false)
    }
  }

  const handleLogoGeneration = async () => {
    if (!selectedBrandName) return

    try {
      setIsGeneratingLogo(true)
      const response = await fetch('/api/branding/logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: selectedBrandName,
          theme,
          category,
          targetAudience: persona,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate logo')
      }

      const data = await response.json()
      setLogoData(data)

      // Add the logo generation result to the chat
      setBrandingMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: 'assistant',
          content: `I've generated a logo for ${selectedBrandName}. Here's my thought process:\n\n${data.prompt}`,
          createdAt: new Date(),
        },
      ])

      setHasResponse(true)
      // Remove automatic navigation
      // goToNextStep()
    } catch (error) {
      console.error('Logo Generation Error:', error)
      setBrandingMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: 'assistant',
          content: 'Sorry, I encountered an error while generating the logo. Please try again.',
          createdAt: new Date(),
        },
      ])
    } finally {
      setIsGeneratingLogo(false)
    }
  }

  const handleMockupGeneration = async () => {
    if (!logoData?.logoUrl || !selectedBrandName) return

    try {
      setIsGeneratingMockup(true)
      const response = await fetch('/api/branding/mockup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoUrl: logoData.logoUrl,
          brandName: selectedBrandName,
          containerType,
          colors: {
            primary: '#4F46E5', // Default colors - we can make these dynamic later
            secondary: '#E5E7EB',
            accent: '#EF4444',
          },
          category,
          theme,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate mockup')
      }

      const data = await response.json()
      setMockupData(data)

      // Add the mockup generation result to the chat
      setBrandingMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: 'assistant',
          content: `I've created a product mockup for ${selectedBrandName}. Here's my approach:\n\n${data.prompt}`,
          createdAt: new Date(),
        },
      ])
    } catch (error) {
      console.error('Mockup Generation Error:', error)
      setBrandingMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: 'assistant',
          content: 'Sorry, I encountered an error while generating the product mockup. Please try again.',
          createdAt: new Date(),
        },
      ])
    } finally {
      setIsGeneratingMockup(false)
    }
  }

  return (
    <div className="space-y-8 py-8">
      <ProgressIndicator
        steps={steps}
        currentStep={currentStepIndex}
        className="mb-8"
      />
      <div className="mx-auto max-w-4xl space-y-8">
        {currentStep === "market-research" && (
          <>
            <Chat
              initialMessages={marketResearchMessages}
              onSubmit={handleMarketResearch}
              isStreaming={isStreaming}
            />
            {hasResponse && !isStreaming && (
              <div className="flex justify-end">
                <Button onClick={goToNextStep} className="gap-2">
                  Next Step: Consumer Persona
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {currentStep === "consumer-persona" && (
          <>
            <Chat
              initialMessages={personaMessages}
              onSubmit={handlePersona}
              isStreaming={isStreaming}
            />
            {hasResponse && !isStreaming && (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="gap-2"
                >
                  Back to Market Research
                </Button>
                <Button onClick={goToNextStep} className="gap-2">
                  Next Step: Branding
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {currentStep === "branding" && (
          <>
            <Chat
              initialMessages={brandingMessages}
              onSubmit={handleBranding}
              isStreaming={isStreaming}
            />
            {showBrandSelection && !isStreaming && (
              <Card className="p-6">
                <h3 className="mb-4 text-2xl font-bold">Select Your Brand Name</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Choose from the generated brand names below. Each name has been carefully crafted to align with your brand values and resonate with your target audience.
                </p>
                <RadioGroup
                  value={selectedBrandName}
                  onValueChange={setSelectedBrandName}
                  className="space-y-6"
                >
                  {brandNames.map((brand) => (
                    <div key={brand.name} className="group relative flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent/50 hover:shadow-sm">
                      <RadioGroupItem value={brand.name} id={brand.name} className="mt-1" />
                      <Label htmlFor={brand.name} className="flex-1 cursor-pointer space-y-2 font-normal">
                        <div className="text-xl font-semibold group-hover:text-primary">{brand.name}</div>
                        <div className="prose prose-sm text-muted-foreground">
                          {brand.description.split('\n').map((paragraph, i) => (
                            <p key={i} className="mt-1">{paragraph}</p>
                          ))}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {selectedBrandName && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Product Mockup</h4>
                      <Tabs defaultValue="can" value={containerType} onValueChange={(v) => setContainerType(v as ContainerType)}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="can" className="space-x-2">
                            <Package className="h-4 w-4" />
                            <span>Can</span>
                          </TabsTrigger>
                          <TabsTrigger value="bottle" className="space-x-2">
                            <Wine className="h-4 w-4" />
                            <span>Bottle</span>
                          </TabsTrigger>
                          <TabsTrigger value="tetra" className="space-x-2">
                            <Beer className="h-4 w-4" />
                            <span>Tetra Pak</span>
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      {mockupData ? (
                        <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={mockupData.mockupUrl}
                            alt={`${selectedBrandName} ${containerType} mockup`}
                            className="size-full object-contain p-4"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-square items-center justify-center rounded-lg border bg-background/50">
                          <Button
                            onClick={handleMockupGeneration}
                            disabled={isGeneratingMockup}
                            variant="outline"
                            className="gap-2"
                          >
                            {isGeneratingMockup ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating Mockup...
                              </>
                            ) : (
                              <>
                                Generate Product Mockup
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )}
            {hasResponse && !isStreaming && !showBrandSelection && (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="gap-2"
                >
                  Back to Consumer Persona
                </Button>
                <Button onClick={goToNextStep} className="gap-2">
                  Skip Logo Generation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {showBrandSelection && !isStreaming && !selectedBrandName && (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="gap-2"
                >
                  Back to Consumer Persona
                </Button>
                <Button onClick={goToNextStep} className="gap-2">
                  Skip Logo Generation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {showBrandSelection && selectedBrandName && !logoData && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="gap-2"
                >
                  Back to Consumer Persona
                </Button>
                <div className="space-x-4">
                  <Button
                    onClick={handleLogoGeneration}
                    disabled={isGeneratingLogo}
                    variant="default"
                    className="gap-2"
                  >
                    {isGeneratingLogo ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating Logo...
                      </>
                    ) : (
                      <>
                        Generate Logo
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={goToNextStep}
                    className="gap-2"
                  >
                    Skip Logo Generation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 