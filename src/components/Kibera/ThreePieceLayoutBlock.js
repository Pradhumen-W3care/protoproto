import React from "react"
import PropTypes from "prop-types"

import { GatsbyImage } from "gatsby-plugin-image"
import FadeReveal from "../FadeReveal"
import TransitionLink from "../TransitionLink"


const ThreePieceStandardLayoutBlock = ({
  titleText,
  textField,
  secondaryTextField,
  leftImage,
  rightImage,
  captionLeft,
  captionRight,
  textOnImageLeft,
  textOnImageRight,
  leftUrl,
  rightUrl,
  titleSize,
  leftImageSize,
  rightImageSize,
}) => (
  <div className="container mx-auto overflow-hidden mb-40">
    <div className="px-6">
      <div className="flex justify-center">
        <div
          className={`${titleSize} md:mb-16 mb-6 leading-none text-center`}
          dangerouslySetInnerHTML={{
            __html: titleText || "",
          }}
        />
      </div>
      <div className="flex -mx-6">
        {/* Begin left hand side column - Flipped depending on text position using `order` */}
        <div className="md:w-5/12 px-6 mx-auto">
          <div className="md:mt-56 mt-16 rte md:text-2xl">
            {/* Content fades in */}
            <FadeReveal>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${textField}`,
                }}
              />

              {/* Mobile left + right images */}
              {(leftImage || rightImage) && (
                <div className="flex items-center my-20 md:hidden block">
                  {leftImage && (
                    <div className="w-full h-full">
                      <div className={`relative mb-4 ${leftImageSize}`}>
                        {leftUrl ? (
                          <TransitionLink to={`/${leftUrl}`}>
                          <div>
                          <GatsbyImage
                          image={
                          leftImage?.localFile?.childImageSharp?.gatsbyImageData
                        }
                          className="w-full h-full"
                          />
                          <div
                          className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                          dangerouslySetInnerHTML={{
                          __html: textOnImageLeft || "",
                        }}
                          />
                          </div>
                          </TransitionLink>
                          ) : (
                          <div>
                            <GatsbyImage
                              image={
                                leftImage?.localFile?.childImageSharp?.gatsbyImageData
                              }
                              className="w-full h-full"
                            />
                            <div
                              className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                              dangerouslySetInnerHTML={{
                                __html: textOnImageLeft || "",
                              }}
                            />
                          </div>
                        )
                        }
                      </div>
                      <figcaption className="md:text-base text-sm px-5">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: captionLeft || "",
                          }}
                        />
                      </figcaption>
                    </div>
                  )}
                  {rightImage && (
                    <div className="w-full h-full">
                      <div className={`relative mb-4 ${rightImageSize}`}>
                        {rightUrl ? (
                          <TransitionLink to={`/${rightUrl}`}>
                            <GatsbyImage
                              image={
                                rightImage?.localFile?.childImageSharp?.gatsbyImageData
                              }
                              className=""
                            />
                            <div
                              className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                              dangerouslySetInnerHTML={{
                                __html: textOnImageRight || "",
                              }}
                            />
                          </TransitionLink>
                        ) : (
                          <div>
                            <GatsbyImage
                              image={
                                rightImage?.localFile?.childImageSharp?.gatsbyImageData
                              }
                              className=""
                            />
                            <div
                              className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                              dangerouslySetInnerHTML={{
                                __html: textOnImageRight || "",
                              }}
                            />
                          </div>
                        )}

                      </div>
                      <figcaption className="md:text-base text-sm px-5">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: captionRight || "",
                          }}
                        />
                      </figcaption>
                    </div>
                  )}
                </div>
              )}
              {/* Mobile secondary text field that shows beneath left + right images */}
              <div
                className="md:hidden block"
                dangerouslySetInnerHTML={{
                  __html: secondaryTextField || "",
                }}
              />
            </FadeReveal>
          </div>
          {leftImage && (
            <div>
              <div className={`relative ${leftImageSize}`}>
                {leftUrl ? (
                  <TransitionLink className="md:block hidden" to={`/${leftUrl}`}>
                    <GatsbyImage
                      image={leftImage?.localFile?.childImageSharp?.gatsbyImageData}
                      className="md:mt-32 mt-16 mb-4"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl hidden md:block"
                      dangerouslySetInnerHTML={{
                        __html: textOnImageLeft || "",
                      }}
                    />
                  </TransitionLink>
                ) : (
                  <div className="md:block hidden">
                    <GatsbyImage
                      image={leftImage?.localFile?.childImageSharp?.gatsbyImageData}
                      className="md:mt-32 mt-16 mb-4"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl hidden md:block"
                      dangerouslySetInnerHTML={{
                        __html: textOnImageLeft || "",
                      }}
                    />
                  </div>
                )}

              </div>
              <figcaption className="md:text-base text-sm hidden md:block">
                <div
                  dangerouslySetInnerHTML={{
                    __html: captionLeft || "",
                  }}
                />
              </figcaption>
            </div>
          )}
        </div>
        <div className="md:w-5/12 mx-auto md:block hidden">
          <div className="md:mt-56 mt-16 rte md:text-2xl">
            {/* Content fades in */}
            <FadeReveal>
              {rightImage && (
                <div>
                  <div className={`relative ${rightImageSize}`}>
                    {rightUrl ? (
                      <TransitionLink to={`/${rightUrl}`}>
                        <GatsbyImage
                          image={rightImage?.localFile?.childImageSharp?.gatsbyImageData}
                          className="mt-12 mb-4"
                        />
                        <div
                          className="absolute top-1/2 left-1/2 layout-img"
                          dangerouslySetInnerHTML={{
                            __html: textOnImageRight || "",
                          }}
                        />
                      </TransitionLink>
                    ) : (
                      <div>
                        <GatsbyImage
                          image={rightImage?.localFile?.childImageSharp?.gatsbyImageData}
                          className="mt-12 mb-4"
                        />
                        <div
                          className="absolute top-1/2 left-1/2 layout-img"
                          dangerouslySetInnerHTML={{
                            __html: textOnImageRight || "",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <figcaption className="md:text-base text-sm">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: captionRight || "",
                      }}
                    />
                  </figcaption>
                </div>
              )}
              <div
                className="hidden md:block mb-63 md:mt-32"
                dangerouslySetInnerHTML={{
                  __html: secondaryTextField || "",
                }}
              />

            </FadeReveal>
          </div>

        </div>
      </div>
    </div>
  </div>
)

const ThreePieceFlippedLayoutBlock = ({
  titleText,
  textField,
  secondaryTextField,
  leftImage,
  rightImage,
  captionLeft,
  captionRight,
  textOnImageLeft,
  textOnImageRight,
  leftUrl,
  rightUrl,
  titleSize,
  leftImageSize,
  rightImageSize,
}) => (
  <div className="container mx-auto overflow-hidden md:mb-24 mb-2 md:mt-40 mt-16">
    <div className="px-6">
      <div className="flex justify-center">
        <div
          className={`${titleSize} md:mb-16 mb-6 leading-none text-center`}
          dangerouslySetInnerHTML={{
            __html: titleText || "",
          }}
        />
      </div>
      <div className="flex flex-wrap -mx-6">
        <div className="md:w-1/2 w-full px-6 mb-16 hidden md:block">
          <div className="md:w-full mr-auto">
            <div className={`relative mb-4 ${leftImageSize}`}>
              {leftUrl ? (
                <TransitionLink to={`/${leftUrl}`}>
                  <GatsbyImage
                    image={
                      leftImage?.localFile?.childImageSharp?.gatsbyImageData
                    }
                    className="w-full h-full"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                    dangerouslySetInnerHTML={{
                      __html: textOnImageLeft || "",
                    }}
                  />
                </TransitionLink>
              ) : (
                <div>
                  <GatsbyImage
                    image={
                      leftImage?.localFile?.childImageSharp?.gatsbyImageData
                    }
                    className="w-full h-full"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                    dangerouslySetInnerHTML={{
                      __html: textOnImageLeft || "",
                    }}
                  />
                </div>
              )}
            </div>
            <figcaption className="md:text-base text-sm px-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: captionLeft || "",
                }}
              />
            </figcaption>
            <FadeReveal>
              <div
                className="rte md:text-xl md:mb-40 mb-16 md:mt-20"
                dangerouslySetInnerHTML={{
                  __html: secondaryTextField || "",
                }}
              />
            </FadeReveal>
          </div>
        </div>
        <div className="md:w-1/2 w-full px-6">
          <div className="md:w-full rte md:text-xl md:mb-40 mb-16 md:mt-20">
            <FadeReveal>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${textField}`,
                }}
              />
            </FadeReveal>
          </div>
          <div className="md:block flex items-end mb-16">
            <div className="md:w-full pr-1 w-1/2">
              <div className={`relative mb-4 ${rightImageSize}`}>
                {rightUrl ? (
                  <TransitionLink to={`/${rightUrl}`}>
                    <GatsbyImage
                      image={
                        rightImage?.localFile?.childImageSharp?.gatsbyImageData
                      }
                      className=""
                    />
                    <div
                      className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: textOnImageRight || "",
                      }}
                    />
                  </TransitionLink>
                ) : (
                  <div>
                    <GatsbyImage
                      image={
                        rightImage?.localFile?.childImageSharp?.gatsbyImageData
                      }
                      className=""
                    />
                    <div
                      className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: textOnImageRight || "",
                      }}
                    />
                  </div>
                )}

              </div>
              <figcaption className="md:text-base text-sm px-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: captionRight || "",
                  }}
                />
              </figcaption>
            </div>
            <div className="md:hidden pl-1 w-1/2">
              <div className={`relative mb-4 ${leftImageSize}`}>
                {leftUrl ? (
                  <TransitionLink to={`/${leftUrl}`}>
                    <GatsbyImage
                      image={
                        leftImage?.localFile?.childImageSharp?.gatsbyImageData
                      }
                      className="w-full h-full"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: textOnImageLeft || "",
                      }}
                    />
                  </TransitionLink>
                ) : (
                  <div>
                    <GatsbyImage
                      image={
                        leftImage?.localFile?.childImageSharp?.gatsbyImageData
                      }
                      className="w-full h-full"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 layout-img rte md:text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: textOnImageLeft || "",
                      }}
                    />
                  </div>
                )}

              </div>
              <figcaption className="md:text-base text-sm px-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: captionLeft || "",
                  }}
                />
              </figcaption>
            </div>
          </div>
          <div className="md:w-full rte md:text-xl md:mb-40 md:mt-20 md:hidden">
            <FadeReveal>
              <div
                className="rte md:text-xl md:mb-40 mb-16 md:mt-20"
                dangerouslySetInnerHTML={{
                  __html: secondaryTextField || "",
                }}
              />
            </FadeReveal>
          </div>
        </div>
      </div>
    </div>
  </div>
)

/**
 * Three Piece Layout component for the Kibera layout builder
 * @author Josh Smith <me@joshsmith.dev>
 * @param  {String} options.textField          Main text
 * @param  {String} options.secondaryTextField Secondary/Mobile text
 * @param  {Object} options.leftImage          Left Image
 * @param  {Object} rightImage                 Right Image
 * @param  {String} textPosition               Determines which layout component is rendered
 */
const ThreePieceLayoutBlock = ({
  titleText = "",
  textField = "",
  secondaryTextField = "",
  textPosition = "left",
  leftImage = null,
  rightImage = null,
  captionLeft = "",
  captionRight = "",
  textOnImageLeft = "",
  textOnImageRight = "",
  leftUrl = null,
  rightUrl = null,
  titleSize = "",
  leftImageSize = "",
  rightImageSize = "",
}) => {
  return textPosition === "left" ? (
    <ThreePieceStandardLayoutBlock
      {...{ titleText, textField, secondaryTextField, leftImage, rightImage, captionLeft, captionRight, textOnImageLeft, textOnImageRight, leftUrl, rightUrl, titleSize, leftImageSize, rightImageSize }}
    />
  ) : (
    <ThreePieceFlippedLayoutBlock
      {...{ titleText, textField, secondaryTextField, leftImage, rightImage, captionLeft, captionRight, textOnImageLeft, textOnImageRight, leftUrl, rightUrl, titleSize, leftImageSize, rightImageSize }}
    />
  )
}

ThreePieceLayoutBlock.propTypes = {
  titleText: PropTypes.string,
  textField: PropTypes.string.isRequired,
  secondaryTextField: PropTypes.string,
  leftImage: PropTypes.object,
  rightImage: PropTypes.object,
  textPosition: PropTypes.string,
  captionLeft: PropTypes.string,
  captionRight: PropTypes.string,
  textOnImageLeft: PropTypes.string,
  textOnImageRight: PropTypes.string,
  leftUrl: PropTypes.object,
  rightUrl: PropTypes.object,
  titleSize: PropTypes.string,
  leftImageSize: PropTypes.string,
  rightImageSize: PropTypes.string,
}

export default ThreePieceLayoutBlock
