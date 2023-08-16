import React from "react"
import Grid from "./Grid"
import FadeReveal from "../../FadeReveal"

const Text = ({ children, className, text }) => {
  const heading = children ? (
    <FadeReveal>{children}</FadeReveal>
  ) : (
    <FadeReveal>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </FadeReveal>
  )
  return (
    <Grid>
      <div className="text-center leading-snug section-rte 2xl:text-2.5xl xl:text-2xl lg:text-xl md:text-base">
        {heading}
      </div>
    </Grid>
  )
}

export default Text
