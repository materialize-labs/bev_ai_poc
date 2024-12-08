import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FormLayoutProps {
  children: ReactNode
  className?: string
  onNext?: () => void
  onBack?: () => void
  isLastStep?: boolean
  isLoading?: boolean
  title: string
  description: string
}

export function FormLayout({
  children,
  className,
  onNext,
  onBack,
  isLastStep = false,
  isLoading = false,
  title,
  description,
}: FormLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-8">
        {children}

        <div className="flex items-center justify-between space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isLoading || !onBack}
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={isLoading || !onNext}
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Processing...
              </>
            ) : isLastStep ? (
              "Complete"
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
} 