import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const ProductCollaborationPanels = ({ data }) => {
  const Panel = ({ data }) => (
    <div className="md:w-1/2 lg:w-5/12 w-full relative collaboration">
      <GatsbyImage
        image={data.img}
        className="h-full md:mb-0 mb-6"
        imgStyle={{ objectFit: "fill" }}
      />
      <div className="collaboration__content">
        <h2
          className="md:uppercase font-bold md:mb-6 mb-4 text-3xl"
          dangerouslySetInnerHTML={{ __html: data.title }}
        ></h2>
        <p
          className="md:mb-0 mb-8"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></p>
      </div>
    </div>
  )

  const CollabThumb = ({ data }) => (
    <div className="w-1/2">
      <GatsbyImage
        image={data.img}
        className="h-full"
        imgStyle={{ objectFit: "fill" }}
      />
    </div>
  )

  return (
    <div className="mx-auto overflow-hidden">
      <div className="px-6">
        <div className="md:flex md:h-full md:justify-center md:flex-wrap">
          {data && data.map((datum, i) => <Panel key={i} data={datum} />)}
        </div>
        <div className="flex md:hidden">
          {data && data.map((datum, i) => <CollabThumb key={i} data={datum} />)}
        </div>
      </div>
    </div>
  )
}

export default ProductCollaborationPanels

