"use client"

import { useEffect, useState } from "react"
import { shippingOptions, calculateTax } from "../../../lib/data"
import { ArrowLeft, ArrowRight, Truck, Clock, Zap, MapPin, Home } from "lucide-react"
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
type ShippingOption2 = {
  id: string;
  name: string;
  price: number | string;
  estimatedDays: string;
  type: 'Delivery' | 'pickup';
  address?: string;
  popular?: boolean;
}

const shippingOptions2: ShippingOption2[] = [
  {
    id: 'home-delivery',
    name: 'Home Delivery',
    price: "Pay on Delivery",
    estimatedDays: '3-5 business days',
    type: 'Delivery',
    
  },
  {
    id: 'shop-pickup-downtown',
    name: 'Shop Pickup - Downtown',
    price: "Free",
    estimatedDays: 'Ready in 2-3 hours',
    type: 'pickup',
    address: '123 Main Street, Downtown, NY 10001'
  },
  {
    id: 'shop-pickup-uptown',
    name: 'Shop Pickup - Uptown',
    price: "Free",
    estimatedDays: 'Ready in 2-3 hours',
    type: 'pickup',
    address: '456 Park Avenue, Uptown, NY 10065',
    popular: true
  }
];
export function ShippingOptionsForm() {
  const { setShippingOption, setStep, selectedShipping,setCustomerDetails ,customerDetails} = useCheckoutStore()
  const { getSubtotal } = useCartStore()
  const [selectedOption, setSelectedOption] = useState(selectedShipping?.id || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = getSubtotal()
  const selectedShippingOption = shippingOptions.find((option) => option.id === selectedOption)
  const shippingCost = selectedShippingOption?.price || 0
  const tax = calculateTax(subtotal)
  const total = subtotal  + tax


  const handleContinue = async () => {
    // setStep(3)
    if (!selectedOption) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const data={
      phoneNumber: customerDetails?.phoneNumber || "",
      name:  customerDetails?.name || "",
      address:  customerDetails?.address || "",
      appartment:  customerDetails?.appartment || "",
      states:  customerDetails?.states || "",
      shippingMethod: selectedShipping?.type ?? null,
    }
    setCustomerDetails(data)
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
                    {customerDetails?.phoneNumber}
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
                    <span className="w-full break-keep"> {customerDetails?.address} {","} {customerDetails?.states}{","} {customerDetails?.appartment} </span>
                  </div>
                </div>
                <div className="">
                  <Link href={"#"} className="text-sm text-orange-500 hover:underline"> <span>Change</span></Link>
                </div>
            </div>
        </Card>
          <div className="w-full">
      <h2 className="text-xl mb-4">Shipping Method</h2>

      <div className="space-y-3">
        {shippingOptions2.map((option) => (
          <div key={option.id}>
            <label
              htmlFor={option.id}
              className="cursor-pointer block"
            >
              <div
                className={`flex bg-gray-50 items-start gap-4 p-4 border rounded-lg transition-all ${
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  id={option.id}
                  name="shipping-method"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => {
                    setSelectedOption(option.id)
                    setShippingOption(option)
                  }}
                  className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-balance">{option.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-normal">
                        {option.price === 0 ? 'FREE' :option.price}
                      </span>
                      {option.popular && (
                        <Badge variant="success" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    {option.estimatedDays}
                  </p>
                  {option.address && (
                    <p className="text-sm text-gray-600 mt-2 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>{option.address}</span>
                    </p>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
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
                <span>${shippingCost}</span>
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
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!selectedOption || isSubmitting} size="lg" className="flex-1 whitespace-nowrap min-w-32">
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
               Payment
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
