import React, { useEffect, useRef, useState } from "react"
import { TransitionPortal } from "gatsby-plugin-transition-link"
import { useLocation } from "@reach/router"
import gsap from "gsap"

import PreLoader from "./PreLoader"

/**
 * Handles the transition out
 */
const transitionOut = ({ duration, el, eventCallback = () => {} }) => {
  gsap
    .timeline()
    .from(el, { opacity: 1, display: "flex", duration: duration / 4 })
    .to(el, { opacity: 0, duration: duration / 4 }, `+=${duration / 2}`)
    .eventCallback("onComplete", eventCallback)
}

/**
 * Higher Order component that wrap the passed component with a preloading portal
 * The portal shows a random preloader and will transition out once the wrapped
 * image has loaded. We rely on the `onLoad` prop being available for this to work
 * @param {Component} Image
 */
const withImagePreLoader = Image => ({ duration = 2, ...passThroughProps }) => {
  const observed = useRef(null)

  // PreLoading is true when the video is playing
  // Loaded is true when the wrapped image's onLoad event has fired
  // Transitioned is true when GSAP has finished transitioning
  const [preLoading, setPreLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [transitioned, setTransitioned] = useState(false)

  const location = useLocation()

  // Don't show a preloader if this is a live preview
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const livePreviewToken = urlParams.get("x-craft-live-preview")
    if (livePreviewToken !== null) {
      setPreLoading(true)
      setTransitioned(true)
    }
  }, [location.search, setLoaded])

  // Detect when the image has loaded and trigger the transition
  useEffect(() => {
    if (loaded) {
      transitionOut({
        duration,
        el: observed.current,
        eventCallback: () => setTransitioned(true),
      })
    }
  }, [duration, loaded])

  return (
    <>
      {preLoading && (
        <Image onLoad={() => setLoaded(true)} {...passThroughProps} />
      )}
      {!transitioned && (
        <TransitionPortal level="top">
          <div
            ref={observed}
            className="bg-white w-screen h-screen flex justify-center items-center"
          >
            <PreLoader onLoad={() => setPreLoading(true)} />
          </div>
        </TransitionPortal>
      )}
    </>
  )
}

export default withImagePreLoader
