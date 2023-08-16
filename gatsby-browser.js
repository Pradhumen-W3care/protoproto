/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import "./src/styles/tailwind.base.css"
import "./src/styles/tailwind.components.css"
import "./src/styles/index.css"
import "./src/styles/categories.css"
import "./src/styles/tailwind.utilities.css"

import React from "react"
import Provider from "./src/context/provider"

import PageElement from "@components/PageElement"
import StripeElement from "@components/StripeElement"

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
