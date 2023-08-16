import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";

const ProductEditorialLargeImage = ({ src }) => (
  <GatsbyImage
    image={src.childImageSharp.gatsbyImageData}
    className="xl:my-32 lg:my-24 md:my-20 my-16"
    imgStyle={{ objectFit: "contain" }} />
)

export default ProductEditorialLargeImage
