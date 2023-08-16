import React from "react"
import PropTypes from "prop-types"
import TransitionLink from "../TransitionLink"

import { GatsbyImage } from "gatsby-plugin-image"
import FadeReveal from "../FadeReveal"

const TwoPieceLayoutBlock = ({ titleText = "", textField = "", image = null, textPosition = "left", textOnImage = "", caption = "", imageUrl = null, titleSize = "", imageSize = "" }) => (
  <div className="container mx-auto overflow-hidden md:h-content md:mb-0 mb-10 md:mt-0 mt-16">
    <div className="px-6 md:h-full">
      <div className="flex justify-center">
        <div
          className={`${titleSize} md:mb-16 mb-6 leading-none text-center`}
          dangerouslySetInnerHTML={{
            __html: titleText || "",
          }}
        />
      </div>
      {textPosition ==='left' ? (
        <div className="flex flex-wrap -mx-6 justify-center items-center md:h-full">
          <div className="md:w-5/12 w-full md:mx-auto px-6 rte md:text-xl md:mb-0 mb-16">
            <FadeReveal>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${textField}`,
                }}
              />
            </FadeReveal>
          </div>
          <div className="md:w-5/12 w-full md:mx-auto px-6">
            <div className={`relative mb-4 ${imageSize}`}>
              {imageUrl ? (
                <TransitionLink to={`${imageUrl}`}>
                  <GatsbyImage
                    image={image?.localFile?.childImageSharp?.gatsbyImageData}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 layout-img rte md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: textOnImage || "",
                    }}
                  />
                </TransitionLink>
              ) : (
                <div>
                  <GatsbyImage
                    image={image?.localFile?.childImageSharp?.gatsbyImageData}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 layout-img rte md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: textOnImage || "",
                    }}
                  />
                </div>
              )}

            </div>
            <figcaption className="md:text-base text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: caption || "",
                }}
              />
            </figcaption>


          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:flex-row-reverse -mx-6 justify-center items-center md:h-full">
          <div className="md:w-5/12 w-full md:mx-auto px-6 rte md:text-xl md:mb-0 mb-16">
            <FadeReveal>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${textField}`,
                }}
              />
            </FadeReveal>
          </div>
          <div className="md:w-5/12 w-full md:mx-auto px-6">
            <div className={`relative mb-4 ${imageSize}`}>
              {imageUrl ? (
                <TransitionLink to={`${imageUrl}`}>
                  <GatsbyImage
                    image={image?.localFile?.childImageSharp?.gatsbyImageData}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 layout-img rte md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: textOnImage || "",
                    }}
                  />
                </TransitionLink>
              ) : (
                <div>
                  <GatsbyImage
                    image={image?.localFile?.childImageSharp?.gatsbyImageData}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 layout-img rte md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: textOnImage || "",
                    }}
                  />
                </div>
              )}
            </div>
            <figcaption className="md:text-base text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: caption || "",
                }}
              />
            </figcaption>


          </div>
        </div>
      )}

    </div>
  </div>
)

TwoPieceLayoutBlock.propTypes = {
  titleText: PropTypes.string,
  textField: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  textPosition: PropTypes.object,
  textOnImage: PropTypes.string,
  caption: PropTypes.string,
  imageUrl: PropTypes.object,
  titleSize: PropTypes.string,
  imageSize: PropTypes.string,
}

export default TwoPieceLayoutBlock
