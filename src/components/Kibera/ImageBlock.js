import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

import ImgPlx from "@components/ImgPlx"

const ImageBlock = ({
  className = "",
  image,
  thumbnails = [],
  thumbnailsPosition = "overlay",
  parallax = true,
  imageSkew = null,
  margins = [],
  fullHeight = false,
  width = "full",
  layout = "standard",
}) => {
  const MainImage = ({ style }) => (
    <GatsbyImage
      image={image?.localFile?.childImageSharp?.gatsbyImageData}
      style={style}
      className={`${fullHeight && "h-content"} ${
        width === "2/3" ? `w-2/3 ml-6` : "w-full"
      } ${getSkewClasses(imageSkew)}`}
    />
  )

  return (
    <div className={`relative ${getMarginClasses(margins)} ${className}`}>
      {/* Static Thumbnails above main image */}
      {!parallax && ["top", "overlay"].indexOf(thumbnailsPosition) >= 0 && (
        <StaticThumbnails
          thumbnails={thumbnails}
          thumbnailsPosition={thumbnailsPosition}
        />
      )}

      {/* Parallaxed Thumbnails */}
      {thumbnails.map(
        (
          {
            thumbnail,
            thumbnailSize,
            verticalAlignment,
            horizontalAlignment,
            negativeOffset,
          },
          i
        ) => {
          // Dynmaically infer thumbnail size
          let maxWidth
          switch (thumbnailSize) {
            case "large":
              maxWidth = "645px"
              break
            case "medium":
              maxWidth = "434px"
              break
            case "small":
            default:
              maxWidth = "370px"
              break
          }

          return (
            <ImgPlx
              key={i}
              className={`${verticalAlignment === "bottom" && "bottom-0"} ${
                verticalAlignment === "center" && "translate-y-1/2 transform"
              } ${verticalAlignment === "top" && "top-0"} xl:block hidden`}
            >
              <GatsbyImage
                image={
                  thumbnail[0]?.localFile?.childImageSharp?.gatsbyImageData
                }
                className={`${
                  horizontalAlignment === "right" && "ml-auto mr-24"
                } ${horizontalAlignment === "center" && "mr-auto ml-auto"} ${
                  horizontalAlignment === "left" && "mr-auto ml-24"
                } ${
                  negativeOffset && getTranslateClasses(negativeOffset, true)
                } transform`}
                style={{
                  maxWidth,
                }}
              />
            </ImgPlx>
          )
        }
      )}

      {/* Main Image */}
      {!layout || layout === "standard" ? (
        <MainImage />
      ) : (
        <div className="xl:hidden flex justify-center items-center">
          <MainImage />
        </div>
      )}

      {/* Static Thumbnails below main image */}
      {!parallax && ["top", "overlay"].indexOf(thumbnailsPosition) === -1 && (
        <StaticThumbnails
          thumbnails={thumbnails}
          thumbnailsPosition={thumbnailsPosition}
        />
      )}
    </div>
  )
}

/**
 * Renders static thumbnails
 * @author Josh Smith <josh@batch.nz
 */
const StaticThumbnails = ({ thumbnails, thumbnailsPosition, constraint }) => {
  const Thumbnails = () =>
    thumbnails.map(
      (
        { thumbnail, verticalAlignment, horizontalAlignment, negativeOffset },
        i
      ) => {
        // Apply negative offset
        if (negativeOffset !== "none") {
          return (
            <GatsbyImage
              image={thumbnail[0]?.localFile?.childImageSharp?.gatsbyImageData}
              key={i}
              className={`ml-auto mr-6 ${
                negativeOffset && getTranslateClasses(negativeOffset, true)
              } transform`}
              style={{
                maxWidth: `193px`,
              }}
            />
          )
        }

        // Fully centered images
        if (
          thumbnailsPosition === "center" &&
          horizontalAlignment === "center"
        ) {
          const utility = i % 2 ? "ml" : "mr"
          return (
            <GatsbyImage
              image={thumbnail[0]?.localFile?.childImageSharp?.gatsbyImageData}
              key={i}
              className={`w-full h-full ${utility}-1`}
              style={{
                maxWidth: `220px`,
              }}
            />
          )
        }

        // Standard Image
        return (
          <GatsbyImage
            image={thumbnail[0]?.localFile?.childImageSharp?.gatsbyImageData}
            key={i}
            className="w-full h-full"
            style={{
              maxWidth: `220px`,
            }}
          />
        )
      }
    )

  // Wrapper for overlayed images
  if (thumbnailsPosition === "overlay") {
    return (
      <div className="absolute z-10 w-full">
        <Thumbnails />
      </div>
    )
  }

  // Wrapper for centered images
  if (thumbnailsPosition === "center") {
    return (
      <div className="flex justify-center items-center my-16 px-6">
        <Thumbnails />
      </div>
    )
  }

  return <Thumbnails />
}

/**
 * Returns image skew utility classes
 * @author Josh Smith <me@joshsmith.dev>
 * @param  {Object} imageSkew image skew data
 * @return string
 */
const getSkewClasses = (imageSkew = {}) => {
  if (imageSkew == null) return ""

  const skewClasses = []
  const { skewPosition, skewDirection } = imageSkew

  // Position and direction
  if (skewPosition === "top" && skewDirection === "right") {
    skewClasses.push("image--diagonal-top")
  } else if (skewPosition === "top" && skewDirection === "left") {
    skewClasses.push("image--diagonal-alt")
  } else if (skewPosition === "bottom" && skewDirection === "left") {
    skewClasses.push("image--diagonal-bottom")
  } else if (skewPosition === "bottom" && skewDirection === "right") {
    skewClasses.push("image--diagonal-bottom-alt")
  }

  return skewClasses.join(" ")
}

/**
 * Returns margin classes
 * @author Josh Smith <josh@batch.nz>
 * @param  {Array}  margins An array of margin objects
 * @return string
 */
const getMarginClasses = (margins = []) => {
  const marginClasses = []

  margins.forEach(({ marginPosition, marginSize }) => {
    const marginUtility = marginPosition === "top" ? "mt" : "mb"
    if (marginSize === "small") {
      marginClasses.push(`md:${marginUtility}-12 ${marginUtility}-4`)
    }
    if (marginSize === "medium") {
      marginClasses.push(`md:${marginUtility}-24 ${marginUtility}-8`)
    }
    if (marginSize === "large") {
      marginClasses.push(`md:${marginUtility}-48 ${marginUtility}-16`)
    }
  })

  return marginClasses.join(" ")
}

const getTranslateClasses = (offset, isNegative = false) => {
  const utility = `translate-y`
  let translateClasses = ""

  switch (offset) {
    case "small":
      translateClasses = `${utility}-16`
      break
    case "medium":
      translateClasses = `${utility}-24`
      break
    case "large":
      translateClasses = `${utility}-40`
      break
    case "half":
      translateClasses = `${utility}-1/2`
      break
    case "full":
    default:
      translateClasses = `${utility}-full`
      break
  }

  return (isNegative ? "-" : "") + translateClasses
}

ImageBlock.propTypes = {
  image: PropTypes.object.isRequired,
  thumbnails: PropTypes.array,
  thumbnailsPosition: PropTypes.string,
  parallax: PropTypes.bool,
  imageSkew: PropTypes.object,
  margins: PropTypes.array,
  fullHeight: PropTypes.bool,
  width: PropTypes.string,
  layout: PropTypes.string,
}

export default ImageBlock
