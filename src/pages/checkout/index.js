import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// Hooks
import { useCart, useCountries, useHasMounted } from "@hooks"

// Custom components
import { CheckoutLayout } from "@components/Layout"
import SEO from "@components/seo"

import {
  SideBar,
  EmailFormStep,
  AddressFormStep,
  ShippingFormStep,
  PaymentFormStep,
} from "@components/Checkout"

import { Api, isAddressValid } from "@utilities"

/**
 * Checkout Page
 * @author Josh Smith <josh@batch.nz>
 * @param  object location
 * @return function
 */
const CheckoutPage = () => {
  const [loading, setLoading] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    email: "",
    shippingAddress: {
      id: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
      stateValue: "",
      countryId: "",
    },
    shippingMethodHandle: "",
  })
  const [cart, setCart] = useState(null)
  const [step, setStep] = useState(1)

  const initCart = useCart()
  const countries = useCountries()
  const hasMounted = useHasMounted()

  const stripe = useStripe();
  const elements = useElements();

  // Fetch the cart out of state OR API if not set
  useEffect(() => {
    if (initCart == null) return
    setCart(initCart)
    setCheckoutForm({
      email: initCart.email,
      shippingAddress: {
        id: initCart.shippingAddressId,
        ...checkoutForm.shippingAddress,
        ...initCart.shippingAddress,
      },
      shippingMethodHandle: initCart.shippingMethodHandle,
    })
    // eslint-disable-next-line
  }, [initCart])

  useEffect(() => {
    determineStep(cart, setStep)
  }, [cart])

  /**
   * Change handler function for form values
   * @param {*} event
   */
  const handleChange = data => {
    setCheckoutForm({ ...checkoutForm, ...data })
  }

  /**
   * Line item update handler
   * @param object lineItem
   */
  const onLineItemUpdate = async lineItem => {
    setLoading(true)

    const data = {
      lineItems: {
        [lineItem.id]: {
          qty: lineItem.qty,
        },
      },
    }

    try {
      const { cart } = await Api.updateCart(data)
      setCart(cart)
    } catch (err) {
      // todo, some error handling here..
    }
    setLoading(false)
  }

  const updateCart = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...checkoutForm,
        makePrimaryShippingAddress: true,
        makePrimaryBillingAddress: true,
        billingAddressSameAsShipping: true,
        paymentSourceId: 2, // Todo, fetch from API
      }

      const { cart } = await Api.updateCart(data)

      setCart(cart)
      
      
    } catch (err) {
      // todo, some error handling here..
    }

    setLoading(false)
  }












  const processPayment = async payload => {
    setLoading(true)

    try {
      const result = await Api.processPayment({
        gatewayId: 2,
        stripeToken: payload.source.id,
        paymentMethodId: payload.paymentMethods.id,
      })

      const { cart } = result

      setCart(cart)

      if (result.redirect) {
        navigate(result.redirect)
      }


      if (cart.isCompleted) {
        navigate("/checkout/success", { state: { order: cart } })
      }
    } catch (err) {
      // todo, error handling
    }

    setLoading(false)
  }

  if (!hasMounted) return null
  if (cart == null || countries == null) return <p>Loading...</p>

  const {
    lineItems: [lineItem],
  } = cart

  if (lineItem == null) {
    navigate("/shop")
    return null
  }

  return (
    <CheckoutLayout
      title={`You're only a few steps away...`}
      sidebar={<SideBar cart={cart} onLineItemUpdate={onLineItemUpdate} />}
      showNav={true}
    >
      <SEO title="Checkout" />

      <EmailFormStep
        email={checkoutForm.email}
        isCurrentUser={cart.isCurrentUser}
        onSubmit={updateCart}
        onChange={e =>
          handleChange({
            [e.target.name]: e.target.value,
          })
        }
        loading={loading}
        setActive={() => {
          setStep(1)
        }}
        active={step === 1}
      />

      <AddressFormStep
        address={checkoutForm.shippingAddress}
        cart={cart}
        countries={countries}
        onSubmit={updateCart}
        onChange={e =>
          handleChange({
            shippingAddress: {
              ...checkoutForm.shippingAddress,
              [e.target.name]: e.target.value,
            },
          })
        }
        loading={loading}
        setActive={() => {
          setStep(2)
        }}
        active={step === 2}
      />

      <ShippingFormStep
        shippingMethodHandle={checkoutForm.shippingMethodHandle}
        cart={cart}
        onSubmit={updateCart}
        onChange={e =>
          handleChange({
            shippingMethodHandle: e.target.value,
          })
        }
        loading={loading}
        setActive={() => {
          setStep(3)
        }}
        active={step === 3}
      />

      <PaymentFormStep
        cart={cart}
        active={step === 4}
        loading={loading}
        onSubmit={processPayment}
      />
    </CheckoutLayout>
  )
}

const determineStep = (cart, setStep) => {
  if (cart?.email == null || cart?.email === "") {
    setStep(1)
  } else if (!isAddressValid(cart?.shippingAddress)) {
    setStep(2)
  } else if (cart?.shippingMethodHandle === null) {
    setStep(3)
  } else {
    setStep(4)
  }
}

export default CheckoutPage
