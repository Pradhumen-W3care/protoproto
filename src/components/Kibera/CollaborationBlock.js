import React from "react"
import PropTypes from "prop-types"

import { GatsbyImage } from "gatsby-plugin-image"
import FadeReveal from "../FadeReveal"

const CollaborationBlock = ({
  titleField = "",
  introduction = "",
  description = "",
  leftImage = null,
  rightImage = null,
  leftImageCaption = "",
  rightImageCaption = "",
}) => {
  const RightFigure = ({ className }) => (
    <figure className={`md:mb-48 mb-16 ${className}`}>
      <GatsbyImage
        image={rightImage?.localFile?.childImageSharp?.gatsbyImageData}
        className="mb-4"
      />
      <figcaption className="md:text-base text-sm">
        {rightImageCaption}
      </figcaption>
    </figure>
  )

  const LeftFigure = ({ className }) => (
    <figure className={className}>
      <GatsbyImage
        image={leftImage?.localFile?.childImageSharp?.gatsbyImageData}
        className="mb-4"
      />
      <figcaption className="md:text-base text-sm">
        {leftImageCaption}
      </figcaption>
    </figure>
  )

  return (
    <div className="container mx-auto overflow-hidden md:mt-32 mt-20 md:mb-40 mb-16">
      <div className="px-6">
        <div className="flex flex-wrap -mx-6">
          <div className="md:w-5/12 mx-auto px-6">
            <FadeReveal>
              <h2 className="md:mt-24 md:text-7xl text-4xl md:mb-16 mb-6 leading-none">
                {titleField}
              </h2>
            </FadeReveal>
            <div className="rte md:text-xl md:mb-56 mb-16">
              <FadeReveal>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${introduction}`,
                  }}
                />
              </FadeReveal>
            </div>
            {rightImage && <RightFigure className="block md:hidden" />}
            {leftImage && <LeftFigure className="hidden md:block" />}
          </div>
          <div className="md:w-5/12 md:mx-auto px-6 md:block flex flex-wrap">
            <div className="w-full order-1">
              {rightImage && <RightFigure className="hidden md:block" />}
              {leftImage && <LeftFigure className="block md:hidden" />}
            </div>
            <div className="rte md:text-xl w-full mb-16">
              <FadeReveal>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${description}`,
                  }}
                />
              </FadeReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CollaborationBlock.propTypes = {
  titleField: PropTypes.string.isRequired,
  introduction: PropTypes.string,
  description: PropTypes.string,
  leftImage: PropTypes.object,
  rightImage: PropTypes.object,
  leftImageCaption: PropTypes.string,
  rightImageCaption: PropTypes.string,
}

export default CollaborationBlock
