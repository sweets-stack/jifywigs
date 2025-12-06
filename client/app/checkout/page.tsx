"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  CreditCardIcon, 
  TruckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, totalPrice } = useCart(); // ✅ Changed to items: cartItems
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");

  const nextStep = () => {
    if (step === "cart") setStep("shipping");
    else if (step === "shipping") setStep("payment");
  };

  const prevStep = () => {
    if (step === "shipping") setStep("cart");
    else if (step === "payment") setStep("shipping");
  };

  const handlePaystackPayment = () => {
    alert("Paystack payment initiated");
    router.push("/order-confirmation");
  };

  if (step === "cart") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => ( // ✅ item is typed by TypeScript inference
                <div key={item.id} className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-jify-primary-600">₦{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
          <Button onClick={nextStep} className="mt-6 bg-jify-primary-500 hover:bg-jify-primary-600">
            Proceed to Shipping
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "shipping") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shipping</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="tel" className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input type="text" className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button onClick={nextStep} className="bg-jify-primary-500 hover:bg-jify-primary-600">
              Continue to Payment
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="space-y-3 mb-6">
          <div className="border-2 rounded-lg p-4 cursor-pointer border-jify-primary-500 bg-jify-primary-50">
            <div className="flex items-center">
              <CreditCardIcon className="w-6 h-6 text-jify-primary-600 mr-3" />
              <div>
                <h3 className="font-medium">Paystack</h3>
                <p className="text-sm text-gray-600">Visa, Mastercard, Bank Transfer</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button onClick={handlePaystackPayment} className="bg-jify-primary-500 hover:bg-jify-primary-600">
            Pay Now (₦{totalPrice.toLocaleString()})
            <CreditCardIcon className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}