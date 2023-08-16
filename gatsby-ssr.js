/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import Provider from "./src/context/provider"
import React from "react"

import PageElement from "@components/PageElement"
import StripeElement from "@components/StripeElement"

export const onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    className: "antialiased",
  })
}

export const wrapRootElement = Provider

export const wrapPageElement = ({ element, props }) => {
  const Element = <PageElement element={element} />

  // Only render the Stripe element on checkout pages
  return props.location.pathname.match(/checkout/) ? (
    <StripeElement>{Element}</StripeElement>
  ) : (
    Element
  )
}
