"use client"

import { useState, useEffect, Suspense } from "react"
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
import ReactMarkdown from "react-markdown"
import {
  getMarketResearchSuggestions,
  getConsumerPersonaSuggestions,
  getBrandingSuggestions,
  getFormulationSuggestions,
  getBusinessPlanSuggestions,
} from '@/lib/suggestions'

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
  {
    id: "business-plan",
    name: "Business Plan",
    description: "Create your comprehensive business strategy",
  },
  {
    id: "review",
    name: "Review",
    description: "Review all decisions and generated content",
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
  "formulation": [
    createInitialMessage(
      "Let's develop your product recipe! Tell me about the key ingredients and flavors you'd like to include. Consider your target consumer preferences and any nutritional goals."
    ),
  ],
  "business-plan": [
    createInitialMessage(
      "I'll create a comprehensive business plan based on all our previous discussions. Please review each section and let me know if you'd like to modify any part."
    ),
  ],
  "review": [
    createInitialMessage(
      "Here's a comprehensive review of your beverage brand development journey. Let's go through each step to ensure everything aligns with your vision."
    ),
  ],
}

interface BrandName {
  name: string;
  description: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

type ContainerType = 'can' | 'bottle' | 'tetra';

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="container py-8">Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  )
}

function CreatePageContent() {
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
  const [formulationMessages, setFormulationMessages] = useState<Message[]>(() => [...stepMessages["formulation"]])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasResponse, setHasResponse] = useState(false)
  const [brandNames, setBrandNames] = useState<BrandName[]>([])
  const [selectedBrandName, setSelectedBrandName] = useState<string>("")
  const [showBrandSelection, setShowBrandSelection] = useState(false)

  // Store category and persona for use in branding
  const [category, setCategory] = useState("")
  const [persona, setPersona] = useState("")
  const [theme, setTheme] = useState("")

  const [containerType, setContainerType] = useState<ContainerType>('can')
  const [isGeneratingMockup, setIsGeneratingMockup] = useState(false)
  const [mockupData, setMockupData] = useState<{ prompt: string; mockupUrl: string } | null>(null)

  const [businessPlanMessages, setBusinessPlanMessages] = useState<Message[]>(() => [...stepMessages["business-plan"]])
  const [reviewMessages, setReviewMessages] = useState<Message[]>(() => [...stepMessages["review"]])

  // Dynamic suggestions state
  const [marketResearchPrompts, setMarketResearchPrompts] = useState<string[]>(() => getMarketResearchSuggestions())
  const [consumerPersonaPrompts, setConsumerPersonaPrompts] = useState<string[]>(() => getConsumerPersonaSuggestions())
  const [brandingPrompts, setBrandingPrompts] = useState<string[]>(() => getBrandingSuggestions())
  const [formulationPrompts, setFormulationPrompts] = useState<string[]>(() => getFormulationSuggestions())
  const [businessPlanPrompts, setBusinessPlanPrompts] = useState<string[]>(() => getBusinessPlanSuggestions())

  // Refresh suggestions when moving between steps
  useEffect(() => {
    switch (currentStep) {
      case "market-research":
        setMarketResearchPrompts(getMarketResearchSuggestions())
        break
      case "consumer-persona":
        setConsumerPersonaPrompts(getConsumerPersonaSuggestions())
        break
      case "branding":
        setBrandingPrompts(getBrandingSuggestions())
        break
      case "formulation":
        setFormulationPrompts(getFormulationSuggestions())
        break
      case "business-plan":
        setBusinessPlanPrompts(getBusinessPlanSuggestions())
        // Trigger initial business plan generation
        if (businessPlanMessages.length === 1) {
          handleBusinessPlan("")
        }
        break
      case "review":
        // Trigger initial review generation
        if (reviewMessages.length === 1) {
          handleReview("")
        }
        break
    }
  }, [currentStep])

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
      setMarketResearchMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: "Sorry, I encountered an error while analyzing the market. Please try again.",
          createdAt: new Date(),
        },
      ])
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
      setPersonaMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: "Sorry, I encountered an error while creating the persona. Please try again.",
          createdAt: new Date(),
        },
      ])
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
            const nameMatch = suggestion.match(/\*\*([^*]+)\*\*/);
            if (!nameMatch?.[1]) {
              console.warn('Could not extract brand name from suggestion');
              return null;
            }

            const name = nameMatch[1].trim();
            if (!name) return null;

            const descriptionMatch = suggestion.match(/#### Brand Story\n([\s\S]+?)(?=####|$)/);
            const description = descriptionMatch 
              ? descriptionMatch[1].trim()
              : 'A unique and memorable brand name for your beverage.';

            const visualIdentityMatch = suggestion.match(/#### Visual Identity[\s\S]*?Colors: ([^\n]+)/);
            const colorsText = visualIdentityMatch?.[1] || '';
            
            const colorArray = colorsText.split(',').map(c => c.trim());
            const colors = colorArray.length >= 3 ? {
              primary: colorArray[0],
              secondary: colorArray[1],
              accent: colorArray[2]
            } : undefined;

            const brand: BrandName = {
              name,
              description: suggestion.trim(),
              colors
            };

            return brand;
          } catch (parseError) {
            console.error('Error parsing brand suggestion:', parseError);
            return null;
          }
        });

        const validBrandNames = parsedBrandNames
          .filter((brand): brand is NonNullable<typeof brand> => brand !== null)
          .filter((brand): brand is BrandName => brand.name !== '');

        if (validBrandNames.length === 0) {
          throw new Error('No valid brand names could be parsed from the response');
        }

        setBrandNames(validBrandNames);
        setHasResponse(true);
        setShowBrandSelection(true);
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

  const handleMockupGeneration = async () => {
    if (!selectedBrandName) return

    try {
      setIsGeneratingMockup(true)
      const response = await fetch('/api/branding/mockup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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

  const handleFormulation = async (message: string) => {
    try {
      setIsStreaming(true)
      setError(null)
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: message,
        createdAt: new Date(),
      }
      
      const updatedMessages = [...formulationMessages, userMessage]
      setFormulationMessages(updatedMessages)

      const assistantMessageId = nanoid()
      setFormulationMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ])

      const response = await fetch("/api/formulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          previousSteps: {
            marketResearch: marketResearchMessages[marketResearchMessages.length - 1]?.content,
            consumerPersona: personaMessages[personaMessages.length - 1]?.content,
            brandName: brandNames.find(b => b.name === selectedBrandName),
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get formulation response')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        setFormulationMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        )
      }

      setHasResponse(true)
    } catch (error) {
      console.error("Formulation Error:", error)
      setError(error instanceof Error ? error.message : "An error occurred while processing your request.")
      setFormulationMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: "Sorry, I encountered an error while developing the recipe. Please try again.",
          createdAt: new Date(),
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  const handleBusinessPlan = async (message: string) => {
    try {
      setIsStreaming(true)
      setError(null)
      
      // If this is the first message, generate the complete plan
      if (businessPlanMessages.length === 1) {
        const assistantMessageId = nanoid()
        setBusinessPlanMessages((prev) => [
          ...prev,
          {
            id: assistantMessageId,
            role: "assistant",
            content: "",
            createdAt: new Date(),
          },
        ])

        const response = await fetch("/api/business-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [],
            previousSteps: {
              marketResearch: marketResearchMessages[marketResearchMessages.length - 1]?.content,
              consumerPersona: personaMessages[personaMessages.length - 1]?.content,
              brandName: brandNames.find(b => b.name === selectedBrandName),
              formulation: formulationMessages[formulationMessages.length - 1]?.content,
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get business plan response')
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No response body')
        }

        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          setBusinessPlanMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          )
        }

        setHasResponse(true)
        return
      }

      // For subsequent messages, handle refinements
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: message,
        createdAt: new Date(),
      }
      
      const updatedMessages = [...businessPlanMessages, userMessage]
      setBusinessPlanMessages(updatedMessages)

      const assistantMessageId = nanoid()
      setBusinessPlanMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ])

      const response = await fetch("/api/business-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          previousSteps: {
            marketResearch: marketResearchMessages[marketResearchMessages.length - 1]?.content,
            consumerPersona: personaMessages[personaMessages.length - 1]?.content,
            brandName: brandNames.find(b => b.name === selectedBrandName),
            formulation: formulationMessages[formulationMessages.length - 1]?.content,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get business plan response')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        setBusinessPlanMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        )
      }

      setHasResponse(true)
    } catch (error) {
      console.error("Business Plan Error:", error)
      setError(error instanceof Error ? error.message : "An error occurred while processing your request.")
      setBusinessPlanMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: "Sorry, I encountered an error while creating the business plan. Please try again.",
          createdAt: new Date(),
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  const handleReview = async (message: string) => {
    try {
      setIsStreaming(true)
      setError(null)
      
      // If this is the first message, generate the complete review
      if (reviewMessages.length === 1) {
        const assistantMessageId = nanoid()
        setReviewMessages((prev) => [
          ...prev,
          {
            id: assistantMessageId,
            role: "assistant",
            content: "",
            createdAt: new Date(),
          },
        ])

        const response = await fetch("/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [],
            previousSteps: {
              marketResearch: marketResearchMessages[marketResearchMessages.length - 1]?.content,
              consumerPersona: personaMessages[personaMessages.length - 1]?.content,
              brandName: brandNames.find(b => b.name === selectedBrandName),
              formulation: formulationMessages[formulationMessages.length - 1]?.content,
              businessPlan: businessPlanMessages[businessPlanMessages.length - 1]?.content,
              mockupData: mockupData,
              brandIdentity: {
                containerType,
                colors: brandNames.find(b => b.name === selectedBrandName)?.colors,
                theme: brandingMessages[brandingMessages.length - 1]?.content,
              }
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get review response')
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No response body')
        }

        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          setReviewMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          )
        }

        setHasResponse(true)
        return
      }

      // For subsequent messages, handle refinements
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: message,
        createdAt: new Date(),
      }
      
      const updatedMessages = [...reviewMessages, userMessage]
      setReviewMessages(updatedMessages)

      const assistantMessageId = nanoid()
      setReviewMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ])

      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          previousSteps: {
            marketResearch: marketResearchMessages[marketResearchMessages.length - 1]?.content,
            consumerPersona: personaMessages[personaMessages.length - 1]?.content,
            brandName: brandNames.find(b => b.name === selectedBrandName),
            formulation: formulationMessages[formulationMessages.length - 1]?.content,
            businessPlan: businessPlanMessages[businessPlanMessages.length - 1]?.content,
            mockupData: mockupData,
            brandIdentity: {
              containerType,
              colors: brandNames.find(b => b.name === selectedBrandName)?.colors,
              theme: brandingMessages[brandingMessages.length - 1]?.content,
            }
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get review response')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        setReviewMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        )
      }

      setHasResponse(true)
    } catch (error) {
      console.error("Review Error:", error)
      setError(error instanceof Error ? error.message : "An error occurred while processing your request.")
      setReviewMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: "Sorry, I encountered an error while creating the review. Please try again.",
          createdAt: new Date(),
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="container space-y-8 py-4 sm:py-8">
      <ProgressIndicator
        steps={steps}
        currentStep={currentStepIndex}
        className="mb-4 sm:mb-8"
      />
      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-8">
        {currentStep === "market-research" && (
          <>
            <Chat
              initialMessages={marketResearchMessages}
              onSubmit={handleMarketResearch}
              isStreaming={isStreaming}
              suggestedPrompts={marketResearchPrompts}
            />
            <div className="mt-4 space-y-4 px-4 sm:px-0">
              {!hasResponse && !isStreaming && marketResearchMessages.length === 1 && (
                <p className="text-sm text-muted-foreground">
                  👋 Start by describing your beverage category. You can use the suggested messages above or write your own.
                </p>
              )}
              {hasResponse && !isStreaming && marketResearchMessages.length > 1 && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    ✅ Market research complete! You can continue the conversation or proceed to the next step.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={goToNextStep} className="gap-2">
                      Next Step: Consumer Persona
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {currentStep === "consumer-persona" && (
          <>
            <Chat
              initialMessages={personaMessages}
              onSubmit={handlePersona}
              isStreaming={isStreaming}
              suggestedPrompts={consumerPersonaPrompts}
            />
            <div className="mt-4 space-y-4 px-4 sm:px-0">
              {!hasResponse && !isStreaming && personaMessages.length === 1 && (
                <p className="text-sm text-muted-foreground">
                  👥 Describe your target consumer. Consider their age, lifestyle, and preferences.
                </p>
              )}
              {hasResponse && !isStreaming && personaMessages.length > 1 && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    ✅ Consumer persona defined! You can refine the persona or move to branding.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
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
                </div>
              )}
            </div>
          </>
        )}

        {currentStep === "branding" && (
          <>
            <Chat
              initialMessages={brandingMessages}
              onSubmit={handleBranding}
              isStreaming={isStreaming}
              suggestedPrompts={brandingPrompts}
            />
            {!showBrandSelection && !isStreaming && brandingMessages.length === 1 && (
              <div className="mt-4 px-4 sm:px-0">
                <p className="text-sm text-muted-foreground">
                  🎨 Describe the key themes and values you want your brand to convey.
                </p>
              </div>
            )}
            {showBrandSelection && !isStreaming && (
              <Card className="mx-4 sm:mx-0">
                <div className="p-4 sm:p-6">
                  <div className="mb-6 space-y-2">
                    <h3 className="text-xl font-bold sm:text-2xl">Select Your Brand Name</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from the generated brand names below. Each name has been carefully crafted to align with your brand values and resonate with your target audience.
                    </p>
                  </div>
                  <RadioGroup
                    value={selectedBrandName}
                    onValueChange={setSelectedBrandName}
                    className="space-y-4 sm:space-y-6"
                  >
                    {brandNames.map((brand) => (
                      <div key={brand.name} className="group relative flex items-start space-x-3 rounded-lg border p-3 hover:bg-accent/50 hover:shadow-sm sm:p-4">
                        <RadioGroupItem value={brand.name} id={brand.name} className="mt-1" />
                        <Label htmlFor={brand.name} className="flex-1 cursor-pointer space-y-2 font-normal">
                          <div className="text-lg font-semibold group-hover:text-primary sm:text-xl">{brand.name}</div>
                          <div className="prose prose-sm text-muted-foreground">
                            <ReactMarkdown
                              components={{
                                h4: ({ children }) => <h4 className="text-base font-semibold mt-4">{children}</h4>,
                                p: ({ children }) => <p className="mt-1 text-sm sm:text-base">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc list-inside mt-2">{children}</ul>,
                                li: ({ children }) => <li className="mt-1 text-sm sm:text-base">{children}</li>,
                              }}
                            >
                              {brand.description}
                            </ReactMarkdown>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {selectedBrandName && (
                    <div className="mt-6 space-y-4 sm:space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Product Mockup</h4>
                        <Tabs defaultValue="can" value={containerType} onValueChange={(v) => {
                          setContainerType(v as ContainerType);
                          setMockupData(null); // Reset mockup when container type changes
                        }}>
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="can" className="space-x-1 sm:space-x-2">
                              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="text-xs sm:text-sm">Can</span>
                            </TabsTrigger>
                            <TabsTrigger value="bottle" className="space-x-1 sm:space-x-2">
                              <Wine className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="text-xs sm:text-sm">Bottle</span>
                            </TabsTrigger>
                            <TabsTrigger value="tetra" className="space-x-1 sm:space-x-2">
                              <Beer className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="text-xs sm:text-sm">Tetra Pak</span>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>

                        {mockupData ? (
                          <div className="space-y-4">
                            <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={mockupData.mockupUrl}
                                alt={`${selectedBrandName} ${containerType} mockup`}
                                className="size-full object-contain p-4"
                              />
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                              <Button
                                onClick={handleMockupGeneration}
                                disabled={isGeneratingMockup}
                                variant="outline"
                                className="gap-2"
                              >
                                {isGeneratingMockup ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm sm:text-base">Generating New Mockup...</span>
                                  </>
                                ) : (
                                  <span className="text-sm sm:text-base">Generate New Mockup</span>
                                )}
                              </Button>
                              <Button onClick={goToNextStep} className="gap-2">
                                <span className="text-sm sm:text-base">Next Step: Formulation</span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
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
                                  <span className="text-sm sm:text-base">Generating Mockup...</span>
                                </>
                              ) : (
                                <span className="text-sm sm:text-base">Generate Product Mockup</span>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
            {hasResponse && !isStreaming && !showBrandSelection && (
              <div className="mt-4 flex flex-col gap-4 px-4 sm:px-0">
                <p className="text-sm text-muted-foreground">
                  ✅ Brand themes defined! You can continue refining or go back to the previous step.
                </p>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    className="gap-2"
                  >
                    Back to Consumer Persona
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {currentStep === "formulation" && (
          <>
            <Chat
              initialMessages={formulationMessages}
              onSubmit={handleFormulation}
              isStreaming={isStreaming}
              error={error}
              suggestedPrompts={formulationPrompts}
            />
            <div className="mt-4 space-y-4 px-4 sm:px-0">
              {!hasResponse && !isStreaming && formulationMessages.length === 1 && (
                <p className="text-sm text-muted-foreground">
                  🧪 Describe your desired ingredients and nutritional goals. Consider your target consumer preferences.
                </p>
              )}
              {hasResponse && !isStreaming && formulationMessages.length > 1 && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    ✅ Recipe development in progress! You can continue refining or go back to branding.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="gap-2"
                    >
                      Back to Branding
                    </Button>
                    {isLastStep ? (
                      <Button onClick={goToNextStep} className="gap-2">
                        Finish
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={goToNextStep} className="gap-2">
                        Next Step
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {currentStep === "business-plan" && (
          <>
            <Chat
              initialMessages={businessPlanMessages}
              onSubmit={handleBusinessPlan}
              isStreaming={isStreaming}
              error={error}
              suggestedPrompts={businessPlanPrompts}
            />
            <div className="mt-4 space-y-4 px-4 sm:px-0">
              {!hasResponse && !isStreaming && businessPlanMessages.length === 1 && (
                <p className="text-sm text-muted-foreground">
                  📊 Let's create your business plan. You can start with the executive summary or focus on specific sections.
                </p>
              )}
              {hasResponse && !isStreaming && businessPlanMessages.length > 1 && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    ✅ Business plan in progress! You can continue refining or go back to formulation.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="gap-2"
                    >
                      Back to Formulation
                    </Button>
                    {isLastStep ? (
                      <Button onClick={goToNextStep} className="gap-2">
                        Finish
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={goToNextStep} className="gap-2">
                        Next Step
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {currentStep === "review" && (
          <>
            <Chat
              initialMessages={reviewMessages}
              onSubmit={handleReview}
              isStreaming={isStreaming}
              error={error}
            />
            {mockupData && (
              <div className="mt-4 space-y-4">
                <Card className="mx-4 sm:mx-0">
                  <div className="p-4 sm:p-6">
                    <div className="mb-4 space-y-2">
                      <h3 className="text-xl font-bold sm:text-2xl">Brand Mockup</h3>
                      <p className="text-sm text-muted-foreground">
                        Your product mockup for {selectedBrandName} in {containerType} format.
                      </p>
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mockupData.mockupUrl}
                        alt={`${selectedBrandName} ${containerType} mockup`}
                        className="size-full object-contain p-4"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            )}
            <div className="mt-4 space-y-4 px-4 sm:px-0">
              {!hasResponse && !isStreaming && reviewMessages.length === 1 && (
                <p className="text-sm text-muted-foreground">
                  📝 Let's create your review. You can start with the executive summary or focus on specific sections.
                </p>
              )}
              {hasResponse && !isStreaming && reviewMessages.length > 1 && (
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="font-semibold">Next Steps</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You've completed all steps in the brand development process. You can:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li>• Review and refine any section by clicking the "Back" button</li>
                      <li>• Ask questions about any part of your brand development</li>
                      <li>• Export your brand development package (coming soon)</li>
                    </ul>
                  </div>
                  <div className="flex justify-start">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="gap-2"
                    >
                      Back to Business Plan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 