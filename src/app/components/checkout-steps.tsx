"use client"

import { useCheckoutStore } from "app/contexts/ThemeContext"
import { cn } from "../utils/cn"
import { Check } from "lucide-react"

const steps = [
  { id: 1, name: "Customer Details", description: "Contact and shipping information", shortName: "Details" },
  { id: 2, name: "Shipping", description: "Select delivery method", shortName: "Shipping" },
  { id: 3, name: "Payment", description: "Complete your order", shortName: "Payment" },
  { id: 4, name: "Confirmation", description: "Order complete", shortName: "Complete" },
]

export function CheckoutSteps() {
  const { currentStep } = useCheckoutStore()

  return (
    <div className="w-full py-6">
      <nav aria-label="Progress">
        <ol className="hidden md:flex items-center justify-between">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className={cn("relative", stepIdx !== steps.length - 1 && "flex-1")}>
              <div className="flex items-center">
                <div className="relative flex items-center justify-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold",
                      step.id < currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : step.id === currentStep
                          ? "border-primary bg-background text-primary"
                          : "border-muted-foreground/30 bg-background text-muted-foreground",
                    )}
                  >
                    {step.id < currentStep ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      step.id <= currentStep ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-5 top-10 h-0.5 w-full",
                    step.id < currentStep ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </li>
          ))}
        </ol>

        <ol className="flex md:hidden items-center justify-between space-x-2">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className="flex-1">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                    step.id < currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.id === currentStep
                        ? "border-primary bg-background text-primary"
                        : "border-muted-foreground/30 bg-background text-muted-foreground",
                  )}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      step.id <= currentStep ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.shortName}
                  </p>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-4 left-1/2 transform -translate-x-1/2 h-0.5 w-full max-w-[calc(100%-2rem)]",
                      step.id < currentStep ? "bg-primary" : "bg-muted-foreground/30",
                    )}
                    style={{ zIndex: -1 }}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
