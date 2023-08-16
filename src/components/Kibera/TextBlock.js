import React from "react"
import PropTypes from "prop-types"

import FadeReveal from "../FadeReveal"

const TextBlock = ({
  fullHeight = true,
  textAlignment = "centered",
  textField,
  width = "2/3",
  titleText,
  titleSize,
}) => {
  return (
    <FadeReveal>
      <div className="container mx-auto overflow-hidden md:my-40 my-16">
        <div className="flex justify-center">
          <div
            className={`${titleSize} md:mb-16 mb-6 leading-none text-center`}
            dangerouslySetInnerHTML={{
              __html: titleText || "",
            }}
          />
        </div>
        <div className="px-6">
          <div className="flex -mx-6">
            <div className={`md:w-${width} rte md:text-xl mx-auto px-6`}>
              <div
                className={`text-${textAlignment}`}
                dangerouslySetInnerHTML={{
                  __html: `${textField}`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </FadeReveal>
  )
}

TextBlock.propTypes = {
  fullHeight: PropTypes.bool,
  textAlignment: PropTypes.string,
  textField: PropTypes.string.isRequired,
  width: PropTypes.string,
  titleText: PropTypes.string,
  titleSize: PropTypes.string,
}

export default TextBlock
