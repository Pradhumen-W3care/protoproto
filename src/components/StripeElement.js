import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const StripeElement = ({ children }) => {
  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.
  const stripePromise = loadStripe(process.env.GATSBY_STRIPE_API_KEY)
  return <Elements stripe={stripePromise}>{children}</Elements>
}

export default StripeElement
