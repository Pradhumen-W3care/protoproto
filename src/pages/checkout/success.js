import React from "react"

import { CheckoutLayout } from "@components/Layout"
import SEO from "@components/seo"
import TransitionLink from "../../components/TransitionLink"

const CheckoutSuccessPage = ({ location }) => {
  const order = location?.state?.order ?? null

  return (
    <CheckoutLayout title={`Thank-you for your order!`} showNav={true}>
      <SEO title="Checkout" />
      <div className="my-10 lg:px-10">
        {order?.lineItems?.length > 0 && (
          <p className="text-xl leading-relaxed">
            You ordered a{" "}
            <span className="text-blue">{order.lineItems[0].description}</span>.
            <br />
            We have charged your card{" "}
            <span className="text-blue">{order.totalPriceAsCurrency}</span>.
            <br />
            Please check your email for your receipt.
          </p>
        )}
        {order == null && (
          <h3>
            Please check your email for your receipt and shipping details.
          </h3>
        )}
        <div className="mt-10">
          <TransitionLink to="/shop" className="underline">
            Continue Shopping
          </TransitionLink>
        </div>
      </div>
    </CheckoutLayout>
  )
}

export default CheckoutSuccessPage
