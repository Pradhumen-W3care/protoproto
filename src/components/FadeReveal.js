import React from "react"
import Reveal from "react-awesome-reveal"
import { keyframes } from "@emotion/react"

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const FadeReveal = ({ children, triggerOnce = true, ...props }) => {
  return (
    <Reveal keyframes={customAnimation} triggerOnce={triggerOnce} {...props}>
      {children}
    </Reveal>
  )
}

export default FadeReveal
