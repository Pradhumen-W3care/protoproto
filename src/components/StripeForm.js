import React, { useContext, useState } from "react"
import { Puff } from "svg-loaders-react"
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { myContext } from "../context/provider"


const StripeForm = ({ cart, onSubmit, loading }) => {
  const { currencys } = useContext(myContext)
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [error, setError] = useState(false)

  // console.log(stripe)
  // console.log(elements)

  const onError = ({ message }) => {
    setError(message)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError(false)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
    }


    const cardElement = elements.getElement(CardNumberElement)

    setSubmitting(true)

    const payload = await stripe.createSource(cardElement, {
      owner: {
        name,
        email: cart.email,
        address: {
          line1: cart.shippingAddress.address1,
          city: cart.shippingAddress.city,
          postal_code: cart.shippingAddress.zipCode,
          country: cart.shippingAddress.countryIso,
          state: cart.shippingAddress.stateValue,
        },
      },
    })


    if (payload.error) {
      setSubmitting(false)
      return onError(payload.error)
    }

    const paymentMethods = await stripe.createPaymentMethod({
      type: payload.source.type,
      card: cardElement,
    })

    payload.paymentMethods = paymentMethods.paymentMethod

    setSubmitting(false)

    return onSubmit(payload)
  }

  return (
    <form
      onSubmit={handleSubmit}>
      { error && <div>{error}</div>}


      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4">
          <label className="mt-4 inline-block" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            className="w-full text-sm bg-gray-100 border-black border rounded px-3 py-3 outline-0"
            required
            placeholder="John Smith"
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <input name="threeDSecure" type="hidden" value="true"/>
        </div>
        <div className="w-full lg:w-1/2 px-4"></div>
        <div className="w-full lg:w-1/2 px-4">
          <label className="mt-4 inline-block" htmlFor="cardNumber">
            Card Number
          </label>
          <CardNumberElement
            id="cardNumber"
            className="w-full text-sm bg-gray-100 border-black border rounded px-3 py-3 outline-0"
            onBlur={() => {}}
            onChange={() => {}}
            onFocus={() => {}}
            onReady={() => {}}
          />
        </div>
        <div className="w-full lg:w-1/2 px-4"></div>
        <div className="w-1/2 lg:w-1/4 px-4">
          <label className="mt-4 inline-block" htmlFor="expiry">
            Card Expiration
          </label>
          <CardExpiryElement
            id="expiry"
            className="w-full text-sm bg-gray-100 border-black border rounded px-3 py-3 outline-0"
            onBlur={() => {}}
            onChange={() => {}}
            onFocus={() => {}}
            onReady={() => {}}
          />
        </div>
        <div className="w-1/2 lg:w-1/4 px-4">
          <label className="mt-4 inline-block" htmlFor="cvc">
            CVC
          </label>
          <CardCvcElement
            id="cvc"
            className="w-full text-sm bg-gray-100 border-black border rounded px-3 py-3 outline-0"
            onBlur={() => {}}
            onChange={() => {}}
            onFocus={() => {}}
            onReady={() => {}}
          />
        </div>
        <div className="w-full px-4"></div>
        <div className="w-full lg:w-1/2 px-4 flex justify-end mt-6 relative">
          <button
            type="submit"
            disabled={!stripe}
            className="bg-secondary text-primary w-1/3 rounded px-3 py-3 text-sm hover:bg-blue-dark outline-0"
          >
            Buy {currencys == "EUR" ? `€ ` : currencys == "USD" ? `$ `:currencys == "AUD" ? `A$ `:''}{cart.totalPrice}
          </button>
          {(submitting || loading) && (
            <Puff className="ml-4 absolute -right-12" stroke="#000" />
          )}
        </div>
      </div>
    </form>
  )
}

export default StripeForm
