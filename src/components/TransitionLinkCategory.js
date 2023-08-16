import React, { useRef } from "react"
import TransitionLink, { TransitionPortal } from "gatsby-plugin-transition-link"
import gsap from "gsap"

import PreLoader from "@components/PreLoaders"

/**
 * Handles the transition out
 */
const transitionOut = ({ exit: { length }, preLoader }) => {
  gsap
    .timeline()
    .to(preLoader, { opacity: 1, display: "flex", duration: length / 4 })
    .to(preLoader, { opacity: 0, duration: length / 4 }, `+=${length / 2}`)
}

/**
 * Main transition link component
 * Handles page transition with the preloader
 * @author Josh Smith <me@joshsmith.dev>
 */
const TransitionLinkFade = ({ ...props }) => {
  const length = 2 // Entire transition length
  const observed = useRef(null)

  return (
    <>
      <TransitionLink
        preventScrollJump
        exit={{
          length,
        }}
        entry={{
          length: length / 2,
          delay: length / 2,
          trigger: () => window.scrollTo(0, 0), // Position the new page at the top
        }}
        trigger={async pages => {
          const exit = await pages.exit
          transitionOut({ exit, preLoader: observed.current })

          // Wait until both pages are visible, then hide the previous page
          // This stops the previous page appearing beneath the entering page
          // if the height doesn't fill the screen
          await pages.entry
          exit.node.classList.add("hidden")
        }}
        {...props}
      >
        {props.children}
      </TransitionLink>

      {/* Creates a portal that sits over the top of the old/new page */}
      <TransitionPortal level="top">
        <div
          ref={observed}
          className="bg-white opacity-0 w-screen h-screen hidden flex justify-center items-center"
        >
          <PreLoader />
        </div>
      </TransitionPortal>
    </>
  )
}

export default TransitionLinkFade
