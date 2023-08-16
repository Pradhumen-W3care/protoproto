import React, { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Plx from "react-plx"

import useWindowSize from "../hooks/useWindowSize"

const ImageWithHeading = ({
  heading,
  className,
  text,
  sources,
  mobileSources,
  alt = "",
  tag = "div",
  position = "top",
  loading = "lazy",
  onLoad = () => {},
}) => {
  const Tag = tag
  const ref = React.createRef()
  const textRef = React.createRef()
  const [height, setHeight] = useState(0)
  const [parallaxData, setParallaxData] = useState([])

  // Get the window size
  const { height: innerHeight } = useWindowSize()

  // Set the fetched image height
  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [ref, setHeight])

  // Update parallax data based on page height + text height
  useEffect(() => {
    let startValue = 0.4
    let endValue = 0.6

    setParallaxData([
      {
        start: "self",
        end: "self",
        endOffset: innerHeight + height,
        properties: [
          {
            startValue:
              position === `center`
                ? height / 3 - (textRef.current?.clientHeight ?? 0) / 2 // Postion text at the midpoint of the container
                : height * startValue,
            endValue: height * endValue,
            property: "translateY",
          },
        ],
      },
    ])
    // eslint-disable-next-line
  }, [height, textRef.current?.clientHeight])

  return (
    <div ref={ref} className={`relative ${className || ``}`}>
      <div
        className={`w-full h-full absolute flex justify-center overflow-hidden z-10`}
      >
        <Plx parallaxData={parallaxData}>
          <div ref={textRef}>
            <Tag
              className={`text-white text-center md:text-5xl lg:text-8.3xl text-5xl px-8 leading-tight parallax-heading mt-5-pers`}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </div>
        </Plx>
      </div>
      <GatsbyImage
        image={sources}
        alt={alt}
        loading={loading}
        className={`${mobileSources ? `lg:block hidden` : `block`} h-full`}
        onLoad={onLoad}
      />
      {mobileSources && (
        <GatsbyImage
          image={mobileSources}
          alt={alt}
          loading={loading}
          className="lg:hidden block h-full"
          onLoad={onLoad}
        />
      )}
    </div>
  )
}

export default ImageWithHeading
