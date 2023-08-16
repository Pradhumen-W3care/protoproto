import React from "react"
import ResponsiveVideo from "../../ResponsiveVideo"
import Grid from "./Grid"

const ProductEditorialVideo = ({ src, title = "" }) => (
  <Grid>
    <ResponsiveVideo src={src} title={title} />
  </Grid>
)

export default ProductEditorialVideo
