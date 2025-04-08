// components/CheckoutWrapper.tsx
"use client"

import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import CheckoutPage from "./CheckoutPage"
import convertToSubcurrency from "@/lib/convertToSubcurrency"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function CheckoutWrapper({amount}: {amount: number}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd"
      }}
    >
      <CheckoutPage amount={amount} />
    </Elements>
  )
}
