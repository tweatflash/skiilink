"use client";
import Link from "next/link";
import { Card } from "./ui/card2";
import { Separator } from "./ui/separator";
import {
  ThemeContext,
  useCartStore,
  useCheckoutStore,
} from "app/contexts/ThemeContext";
import { Button } from "./ui/button2";
import { ArrowLeft } from "lucide-react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useContext, useEffect, useState } from "react";
import createOrder from "../../../lib/createOrder";
import PaymentConfirmation from "./paymentConfrimModal";
export function PaymentForm() {
  const { setStep, customerDetails } =
    useCheckoutStore();
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
    );
  }
  const { cartItems } = themeContext;
  const [orderItems, setOrderItems] = useState<
    { id: string | number; quantity: number }[] | []
  >([]);
  const [paymentObj, setPaymentObj] = useState<
    | {
        items: any[];
        shippingFee: number;
        phoneNumber: string;
        name: string;
        states: string;
        address: string;
        appartment: string;
        shippingMethod: string;
        paymentIntentId: string;
        tx_ref: string;
        flw_ref: string;
      }
    | {}
  >({});
  const { items, clearCart } = useCartStore();
  const [orderLoading, setOrderloading] = useState(false);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const config = {
    public_key: "FLWPUBK-92a0a4f29a6ddc5801203c56a869c24e-X",
    tx_ref: Date.now().toString(),
    amount: total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: customerDetails?.phoneNumber || "0000000000",
      name: customerDetails?.name || "john doe",
    },
    customizations: {
      title: "SKIILINK VENTURES LIMITED",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response: any) => {
      const { transaction_id, tx_ref, flw_ref } = response;

      console.log(response);
      // removeAllItems(items)

      setOrderloading(true);
      // onClose()
      handleCreateOrder(transaction_id, tx_ref, flw_ref);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  // if (!isOpen) return null;
  useEffect(() => {
    // console.log({...paymentObj});
  }, [paymentObj]);
  const handleCreateOrder = async (
    transaction_id: any,
    tx_ref: any,
    flw_ref: any
  ) => {
    const orderInn: { id: string | number; quantity: number }[] | undefined =
      cartItems.map((item) => {
        return { id: item.product._id, quantity: item.quantity };
      });
    const payObj = {
      ...customerDetails,
      items: orderInn,
      shippingFee: 1330,
      paymentIntentId: transaction_id,
      tx_ref,
      flw_ref,
    };
    // console.log({...paymentObj});
    const response = await createOrder(payObj);
    console.log(response);
    setOrderloading(false);
    setStep(4);
    // items.forEach((item:CartItem) => onRemoveItem(item.product._id.toString()));
  };
  const handleBack = () => {
    setStep(2);
  };
  return (
    <>
      <div className="space-y-6">
        <Card className="border-gray-200 p-4 bg-gray-50 gap-2 shadow-none">
          <div className="flex justify-between">
            <div className="flex-1 flex flex-wrap">
              <div className="basis-[6em]">
                <span className="text-gray-600">Contact</span>
              </div>
              <div className="flex-1 pr-3">{customerDetails?.phoneNumber}</div>
            </div>
            <div className="">
              <Link
                href={"#"}
                className="text-sm text-orange-500 hover:underline"
              >
                {" "}
                <span>Change</span>
              </Link>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="flex-1 flex flex-wrap">
              <div className="basis-[6em]">
                <span className="text-gray-600">Ship to</span>
              </div>
              <div className="flex-1 min-w-56 w-full pr-3">
                <span className="w-full break-keep">
                  {" "}
                  {customerDetails?.address} {","} {customerDetails?.states}
                  {","} {customerDetails?.appartment}{" "}
                </span>
              </div>
            </div>
            <div className="">
              <Link
                href={"#"}
                className="text-sm text-orange-500 hover:underline"
              >
                {" "}
                <span>Change</span>
              </Link>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="flex-1 flex flex-wrap">
              <div className="basis-[6em] pr-3">
                <span className="text-gray-600">Shipping method</span>
              </div>
              <div className="flex-1 min-w-56 w-full pr-3">
                <span className="w-full break-keep">
                  {customerDetails?.shippingMethod}
                </span>
              </div>
            </div>
            <div className="">
              <Link
                href={"#"}
                className="text-sm text-orange-500 hover:underline"
              >
                {" "}
                <span>Change</span>
              </Link>
            </div>
          </div>
        </Card>
        <div className="flex justify-between flex-wrap gap-4">
          <Button
            variant="outline"
            className="flex-1 whitespace-nowrap"
            size="lg"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>
          {orderLoading ? (
            <Button
              disabled
              size="lg"
              className="flex-1 whitespace-nowrap min-w-32"
            >
              <div className="flex items-center justify-center space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </Button>
          ) : (
            <FlutterWaveButton
              className="flex-1 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-11 px-8"
              {...fwConfig}
            />
          )}
        </div>
        
      </div>
      <PaymentConfirmation/>
    </>
  );
}
