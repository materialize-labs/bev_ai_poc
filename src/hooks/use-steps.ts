"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface Step {
  id: string
  name: string
  description: string
}

export function useSteps(steps: Step[], defaultStep: string = steps[0].id) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStep = searchParams.get("step") || defaultStep
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const goToStep = (stepId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("step", stepId)
    router.push(`?${params.toString()}`)
  }

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      goToStep(steps[currentStepIndex + 1].id)
    }
  }

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      goToStep(steps[currentStepIndex - 1].id)
    }
  }

  return {
    currentStep,
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep,
    goToNextStep,
    goToPreviousStep,
  }
} 