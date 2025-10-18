"use client"

import { useState } from "react"
import { shippingOptions, calculateTax } from "../../../lib/data"
import { ArrowLeft, ArrowRight, Truck, Clock, Zap } from "lucide-react"
import { Button } from "./ui/button2"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card2"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import Badge from "./ui/Badge"
import { useCartStore, useCheckoutStore } from "app/contexts/ThemeContext"
import { Separator } from "./ui/separator"
import Link from "next/link"

const shippingIcons = { 
  standard: Truck,
  express: Clock,
  overnight: Zap,
}

export function ShippingOptionsForm() {
  const { setShippingOption, setStep, selectedShipping ,customerDetails} = useCheckoutStore()
  const { getSubtotal } = useCartStore()
  const [selectedOption, setSelectedOption] = useState(selectedShipping?.id || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = getSubtotal()
  const selectedShippingOption = shippingOptions.find((option) => option.id === selectedOption)
  const shippingCost = selectedShippingOption?.price || 0
  const tax = calculateTax(subtotal + shippingCost)
  const total = subtotal + shippingCost + tax

  const handleContinue = async () => {
    if (!selectedShippingOption) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShippingOption(selectedShippingOption)
    setStep(3)
    setIsSubmitting(false)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <div className="space-y-6">
        <Card className="border-gray-200 p-4 bg-gray-50 gap-2 shadow-none">
            <div className="flex justify-between">
                <div className="flex-1 flex flex-wrap">
                  <div className="basis-[6em]">
                    <span className="text-gray-600">Contact</span>
                  </div>
                  <div className="flex-1 pr-3">
                    {customerDetails?.email}
                  </div>
                </div>
                <div className="">
                  <Link href={"#"} className="text-sm text-orange-500 hover:underline"> <span>Change</span></Link>
                </div>
            </div>
            <Separator/>
           <div className="flex justify-between">
                <div className="flex-1 flex flex-wrap">
                  <div className="basis-[6em]">
                    <span className="text-gray-600">Ship to</span>
                  </div>
                  <div className="flex-1 min-w-56 w-full pr-3">
                    <span className="w-full break-keep"> {customerDetails?.address} {","} {customerDetails?.city}{","} {customerDetails?.zipCode} {","} {customerDetails?.country}</span>
                  </div>
                </div>
                <div className="">
                  <Link href={"#"} className="text-sm text-orange-500 hover:underline"> <span>Change</span></Link>
                </div>
            </div>
        </Card>
          <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Method
                </h2>
                <div className="space-y-4">
                           <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {shippingOptions.map((option) => {
              return (
                <div key={option.id} className="relative">
                  <Label
                    htmlFor={option.id}
                    className={`flex bg-gray-50 items-center space-x-4 p-[14px] rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedOption === "option.id"
                        ? "border-orange-500 bg-primary/5"
                        : "border-orange-500 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                     
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-balance">{option.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">${option.price.toFixed(2)}</span>
                            {option.id === "express" && (
                              <Badge variant="success" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        {/* <p className="text-sm text-muted-foreground text-pretty">{option.description}</p> */}
                        <p className="text-sm font-medium text-primary mt-1">{option.estimatedDays}</p>
                      </div>
                    </div>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
                </div>
              </div>
      {/* Updated Order Summary */}
      {selectedShippingOption && (
        <Card>
          <CardHeader>
            <CardTitle>Updated Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping ({selectedShippingOption.name})</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">Estimated Delivery:</span>
                <span>{selectedShippingOption.estimatedDays}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between flex-wrap gap-4">
        <Button variant="outline" className="flex-1 whitespace-nowrap" onClick={handleBack} size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
        <Button onClick={handleContinue} disabled={!selectedOption || isSubmitting} size="lg" className="flex-1 whitespace-nowrap min-w-32">
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              Continue to Payment
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
