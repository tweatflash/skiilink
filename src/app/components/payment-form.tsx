"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { calculateTax } from "../../../lib/data"
import { ArrowLeft, CreditCard, Lock, Shield } from "lucide-react"
import { Button } from "./ui/button2"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Badge from "./ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card2"
import { useCartStore, useCheckoutStore } from "app/contexts/ThemeContext"
import { Separator } from "./ui/separator"

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Invalid card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Please enter MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4, "CVV must be 3-4 digits"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
})

type PaymentForm = z.infer<typeof paymentSchema>

export function PaymentForm() {
  const { setStep, customerDetails, selectedShipping, setOrder } = useCheckoutStore()
  const { items, getSubtotal, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getSubtotal()
  const shippingCost = selectedShipping?.price || 0
  const tax = calculateTax(subtotal + shippingCost)
  const total = subtotal + shippingCost + tax
    const phone =  ""
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
  })

  const cardNumber = watch("cardNumber", "")

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (num.startsWith("4")) return "Visa"
    if (num.startsWith("5") || num.startsWith("2")) return "Mastercard"
    if (num.startsWith("3")) return "American Express"
    return "Card"
  }

  const onSubmit = async (data: PaymentForm) => {
    if (!customerDetails || !selectedShipping) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Create order
        const orderCustomerDetails = {
          ...customerDetails,
          address:
            typeof customerDetails.address === "string"
              ? {
                  street: customerDetails.address,
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                }
              : customerDetails.address,
        }
    
        const order = {
          id: `ORD-${Date.now()}`,
          items,
          customerDetails: orderCustomerDetails,
          shippingOption: selectedShipping,
          subtotal,
          shipping: shippingCost,
          tax,
          total,
          status: "processing" as const,
          createdAt: new Date(),
          trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        }
    
        setOrder(order)
        clearCart()
        setStep(4)
        setIsProcessing(false)
  }

  const handleBack = () => {
    setStep(2)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  {...register("cardNumber", {
                    onChange: (e) => {
                      e.target.value = formatCardNumber(e.target.value)
                    },
                  })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={errors.cardNumber ? "border-destructive pr-20" : "pr-20"}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Badge variant="default" className="text-xs">
                    {getCardType(cardNumber)}
                  </Badge>
                </div>
              </div>
              {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  {...register("expiryDate")}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  {...register("cvv")}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && <p className="text-sm text-destructive">{errors.cvv.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                {...register("cardholderName")}
                placeholder="John Doe"
                className={errors.cardholderName ? "border-destructive" : ""}
              />
              {errors.cardholderName && <p className="text-sm text-destructive">{errors.cardholderName.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-success-foreground">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Final Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping ({selectedShipping?.name})</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm space-y-1">
                <p className="font-medium">Shipping to:</p>
                <p className="text-muted-foreground">
                  {customerDetails?.firstName} {customerDetails?.lastName}
                </p>
                <p className="text-muted-foreground">
                  {customerDetails?.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} size="lg" disabled={isProcessing}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shipping
          </Button>
          <Button type="submit" disabled={isProcessing} size="lg" className="min-w-40">
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Complete Order ${total.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
