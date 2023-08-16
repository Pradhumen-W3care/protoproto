import React, { useRef, useEffect } from "react"
import { TransitionPortal } from "gatsby-plugin-transition-link"
import gsap from "gsap"

/**
 * Handles the transition in and out
 */
const transitionInOut = ({ exit: { length }, Preloader }) => {
  return gsap
    .timeline()
    .to(Preloader, { opacity: 1, display: "flex", duration: length / 4 })
    .to(Preloader, { opacity: 0, duration: length / 4 }, `+=${length / 2}`)
}

const withTransitionPortal = Preloader => ({
  duration = null,
  visible = false,
  onComplete = () => {},
}) => {
  const observed = useRef(null)

  useEffect(() => {
    if (duration) {
      transitionInOut({
        exit: { length: duration },
        Preloader: observed.current,
      }).eventCallback("onComplete", onComplete)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <TransitionPortal level="top">
      <div
        ref={observed}
        className={`bg-white w-screen h-screen ${
          visible ? `` : `opacity-0 hidden`
        } flex justify-center items-center`}
      >
        <div className="lg:w-1/2 iphone-fix">
          <Preloader />
        </div>
      </div>
    </TransitionPortal>
  )
}

export default withTransitionPortal
