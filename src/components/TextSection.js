import React from "react"
import FadeReveal from "./FadeReveal"

const TextSection = ({
  children,
  className,
  text,
  tag = "div",
  full = false,
  centered = true,
  small,
}) => {
  const Tag = tag
  const headingClasses = `text-center leading-snug section-rte 2xl:text-2.5xl xl:text-2xl lg:text-xl text-xl lg:leading-1.8 xl:leading-2.2 2xl:leading-2.2 ${
    className || ``
  }`

  const heading = children ? (
    <Tag className={headingClasses}>
      <FadeReveal>{children}</FadeReveal>
    </Tag>
  ) : (
    <FadeReveal>
      <Tag
        className={headingClasses}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </FadeReveal>
  )

  return (
    <div className="container mx-auto overflow-hidden">
      <div className="md:px-0 px-6">
        <div
          className={`flex ${centered ? `items-center` : ``} ${
            `py-40`
          }`}
        >
          <div className="lg:w-1/2 md:w-2/3 w-full mx-auto">{heading}</div>
        </div>
      </div>
    </div>
  )
}

export default TextSection
