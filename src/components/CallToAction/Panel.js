import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";

const CallToActionPanel = ({ imgSrc, title, url }) => (
  <a
    href={url}
    className="cta-panel 2xl:my-32 2xl:mx-16 xl:my-20 xl:mx-10 lg:my-16 lg:mx-8 relative flex justify-center overflow-hidden"
  >
    <GatsbyImage
      image={imgSrc.childImageSharp.gatsbyImageData}
      className="cta-panel__image"
      imgStyle={{ objectFit: "contain" }} />
    <h2 className="text-white uppercase xl:text-7xl lg:text-5xl text-4xl underline absolute inset-0 flex justify-center items-center">
      {title}
    </h2>
  </a>
)

export default CallToActionPanel
