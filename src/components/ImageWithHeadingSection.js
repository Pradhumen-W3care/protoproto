import React from "react"

import ImageWithHeading from "./ImageWithHeading"

const ImageWithHeadingSection = ({
  heading,
  className,
  full = false,
  sources,
  tag,
}) => {
  return (
    <div className={`container mx-auto overflow-hidden ${className}`}>
      <div className="px-6">
        <div className="flex -mx-6">
          <div className="w-full px-6">
            <ImageWithHeading
              tag={tag}
              sources={sources}
              className={`${
                full ? `h-screen` : `h-content md:h-full lg:h-content`
              }`}
              heading={heading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageWithHeadingSection
