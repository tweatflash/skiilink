"use client"

import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Button from "./ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card2"
import Badge from "./ui/Badge"
import { useCheckoutStore } from "app/contexts/ThemeContext"
import { Separator } from "./ui/separator"

export function OrderConfirmation() {
  const { order, reset } = useCheckoutStore()

  if (!order) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground">No order found</p>
        </CardContent>
      </Card>
    )
  }

  const handleContinueShopping = () => {
    reset()
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="border-success/20 bg-success/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-balance mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground text-pretty">
                Thank you for your purchase. Your order has been successfully placed and is being processed.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Order #:</span>
                <Badge variant="default" className="font-mono">
                  {order.id}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Tracking #:</span>
                <Badge variant="default" className="font-mono">
                  {order.trackingNumber}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Order Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image[0].url}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping ({order.shippingOption.name})</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>Shipping Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm mb-1">Delivery Address</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    {order.customerDetails.firstName} {order.customerDetails.lastName}
                  </p>
                  <p>{order.customerDetails.address.street}</p>
                  <p>
                    {order.customerDetails.address.city}, {order.customerDetails.address.state}{" "}
                    {order.customerDetails.address.zipCode}
                  </p>
                  <p>{order.customerDetails.address.country}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium text-sm mb-1">Shipping Method</p>
                <div className="text-sm text-muted-foreground">
                  <p>{order.shippingOption.name}</p>
                  <p>{order.shippingOption.estimatedDays}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.customerDetails.email}</p>
                <p className="text-muted-foreground">{order.customerDetails.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                1
              </div>
              <div>
                <p className="font-medium text-sm">Order Processing</p>
                <p className="text-xs text-muted-foreground">We're preparing your items for shipment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                2
              </div>
              <div>
                <p className="font-medium text-sm">Shipping Notification</p>
                <p className="text-xs text-muted-foreground">You'll receive tracking info via email</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                3
              </div>
              <div>
                <p className="font-medium text-sm">Delivery</p>
                <p className="text-xs text-muted-foreground">{order.shippingOption.estimatedDays}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Download className="w-4 h-4" />
          <span>Download Receipt</span>
        </Button>
        <Button  className="flex items-center space-x-2">
          <Link href="/orders" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Track Order</span>
          </Link>
        </Button>
        <Button  variant="outline" onClick={handleContinueShopping}>
          <Link href="/" className="flex items-center space-x-2">
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
