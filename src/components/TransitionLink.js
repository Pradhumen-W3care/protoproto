import React, { useContext } from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import { myContext } from "../context/provider"

/**
 * Main transition link component
 * Handles page fade transitions
 * @author Josh Smith <me@joshsmith.dev>
 */
const TransitionLinkFade = ({ ...props }) => {
  const { setMobileMenuVisible } = useContext(myContext)
  return (
    <>
      <TransitionLink
        preventScrollJump
        exit={{
          length: 0.4,
          state: { opacity: 0 },
        }}
        entry={{
          delay: 0.4,
          state: { opacity: 1 },
          trigger: () => window.scrollTo(0, 0), // Position the new page at the top
        }}
        trigger={async pages => {
          setMobileMenuVisible(false)
        }}
        {...props}
      >
        {props.children}
      </TransitionLink>
    </>
  )
}

export default TransitionLinkFade
