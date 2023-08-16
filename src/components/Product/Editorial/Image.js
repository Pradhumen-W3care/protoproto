import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import Grid from "./Grid"

const ProductEditorialImage = ({ src }) => (
  <Grid>
    <GatsbyImage
      image={src.childImageSharp.gatsbyImageData}
      imgStyle={{ objectFit: "contain" }} />
  </Grid>
)

export default ProductEditorialImage
