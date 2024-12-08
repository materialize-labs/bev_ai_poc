import { cn } from "@/lib/utils"

interface Step {
  id: string
  name: string
  description: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressIndicator({
  steps,
  currentStep,
  className,
}: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress" className={cn("mx-auto w-full max-w-2xl", className)}>
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                index <= currentStep
                  ? "border-primary"
                  : "border-muted",
                "hover:border-primary/60"
              )}
            >
              <span className="text-sm font-medium">
                Step {index + 1}
              </span>
              <span className="text-lg font-semibold">{step.name}</span>
              <span className="text-sm text-muted-foreground">
                {step.description}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
} 