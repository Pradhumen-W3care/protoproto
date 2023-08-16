import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import ImageWithHeading from "@components/ImageWithHeading"

import {
  CollaborationBlock,
  ThreePieceLayoutBlock,
  TwoPieceLayoutBlock,
  ImageBlock,
  TextBlock,
} from "@components/Kibera"

const KiberaPage = ({ data }) => {
  const { craftStoriesKiberaLayoutEntry: entry } = data

  const {
    seomatic,
    heroImage: [heroImage],
  } = entry

  const headerComponent = (
    <ImageWithHeading
      className="h-screen"
      tag="h1"
      position="bottom"
      sources={
        heroImage.image?.[0]?.localFile?.childImageSharp?.gatsbyImageData
      }
      loading="eager"
      heading={heroImage.heading}
    />
  )

  return (
    <Layout theme="dark" header={headerComponent} showNav={false} seomatic={seomatic}>
      {entry.kiberaStoryBuilder.map((block, i) => {
        let BlockComponent

        switch (block.typeHandle) {
          case "collaboration":
            BlockComponent = (
              <CollaborationBlock
                key={i}
                titleField={block.titleField || ""}
                introduction={block.introduction}
                description={block.description}
                leftImage={block.leftImage.length ? block.leftImage[0] : null}
                rightImage={
                  block.rightImage.length ? block.rightImage[0] : null
                }
                leftImageCaption={block.leftImageCaption}
                rightImageCaption={block.rightImageCaption}
              />
            )
            break
          case "twoPieceLayout":
            console.log(block.textPosition)
            console.log(block.textOnImage, block.caption)
            BlockComponent = (
              <TwoPieceLayoutBlock
                key={i}
                imageSize={block.imageSize}
                titleSize={block.titleSize}
                titleText={block.titleText}
                image={block.image.length ? block.image[0] : null}
                textField={block.textField}
                textPosition={block.textPosition}
                textOnImage={block.textOnImage}
                caption={block.caption}
                imageUrl={block.imageUrl.length ? block.imageUrl[0].url : null}
              />
            )
            break
          //  Three piece layout block component
          case "threePieceLayout":
            console.log(block.titleSize)
            BlockComponent = (
              <ThreePieceLayoutBlock
                key={i}
                leftImageSize={block.leftImageSize}
                rightImageSize={block.rightImageSize}
                titleSize={block.titleSize}
                titleText={block.titleText}
                textField={block.textField}
                secondaryTextField={block.secondaryTextField}
                textSize={block.textSize}
                textPosition={block.textPosition}
                captionLeft={block.captionLeft}
                captionRight={block.captionRight}
                textOnImageLeft={block.textOnImageLeft}
                textOnImageRight={block.textOnImageRight}
                leftUrl={block.leftUrl.length ? block.leftUrl[0].url : null}
                rightUrl={block.rightUrl.length ? block.rightUrl[0].url : null}
                leftImage={block.leftImage.length ? block.leftImage[0] : null}
                rightImage={
                  block.rightImage.length ? block.rightImage[0] : null
                }
              />
            )
            break
          // Image block component
          case "image":
            BlockComponent = (
              <React.Fragment key={i}>
                <ImageBlock
                  className="xl:block hidden"
                  image={block.image.length ? block.image[0] : null}
                  thumbnails={block.parallaxThumbnails}
                  imageSkew={block.imageSkew.length ? block.imageSkew[0] : null}
                  margins={block.margin}
                  fullHeight={block.fullHeight}
                />
                <ImageBlock
                  className="xl:hidden block"
                  image={
                    block.mobileImage.length
                      ? block.mobileImage[0]
                      : block.image.length
                      ? block.image[0]
                      : null
                  }
                  thumbnailsPosition={block.mobileThumbnailsPosition}
                  thumbnails={block.mobileThumbnails}
                  parallax={false}
                  imageSkew={
                    block.mobileImageSkew.length
                      ? block.mobileImageSkew[0]
                      : null
                  }
                  margins={block.mobileMargin}
                  width={block.mobileWidth}
                  layout={block.mobileLayout}
                />
              </React.Fragment>
            )
            break
          case "text":
            BlockComponent = (
              <TextBlock
                key={i}
                titleSize={block.titleSize}
                fullHeight={block.fullHeight}
                textAlignment={block.textAlignment}
                textField={block.textField}
                width={block.width}
                titleText={block.titleText}
              />
            )
            break
          default:
            BlockComponent = <div key={i}></div>
            break
        }

        return BlockComponent
      })}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    craftStoriesKiberaLayoutEntry(slug: { eq: $slug }) {
      heroImage {
        ... on Craft_heroImage_heroImage_BlockType {
          heading
          image {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    height: 820
                    quality: 100
                    placeholder: NONE
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
        }
      }
      kiberaStoryBuilder {
        ... on Craft_kiberaStoryBuilder_image_BlockType {
          image {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
          mobileImage {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
          imageSkew {
            ... on Craft_imageSkew_BlockType {
              skewPosition
              skewDirection
            }
          }
          margin {
            ... on Craft_margin_BlockType {
              marginPosition
              marginSize
            }
          }
          parallaxThumbnails {
            ... on Craft_parallaxThumbnails_BlockType {
              thumbnail {
                ... on Craft_uploads_Asset {
                  url
                  title
                  hasFocalPoint
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        quality: 100
                        placeholder: BLURRED
                        layout: FULL_WIDTH
                      )
                    }
                  }
                }
              }
              thumbnailSize
              horizontalAlignment
              verticalAlignment
              negativeOffset
            }
          }
          mobileThumbnailsPosition
          mobileThumbnails {
            ... on Craft_mobileThumbnails_BlockType {
              thumbnail {
                ... on Craft_uploads_Asset {
                  url
                  title
                  hasFocalPoint
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        quality: 100
                        placeholder: BLURRED
                        layout: FULL_WIDTH
                      )
                    }
                  }
                }
              }
              thumbnailSize
              horizontalAlignment
              negativeOffset
            }
          }
          mobileImageSkew {
            ... on Craft_mobileImageSkew_BlockType {
              skewPosition
              skewDirection
            }
          }
          mobileMargin {
            ... on Craft_mobileMargin_BlockType {
              marginPosition
              marginSize
            }
          }
          mobileWidth
          mobileLayout
          fullHeight
          typeHandle
        }
        ... on Craft_kiberaStoryBuilder_text_BlockType {
          fullHeight
          titleSize
          textAlignment
          textField
          width
          typeHandle
          titleText
        }
        ... on Craft_kiberaStoryBuilder_twoPieceLayout_BlockType {
          titleText
          textField
          titleSize
          textPosition
          textOnImage
          caption
          imageUrl {
            url
          }
          image {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                }
              }
            }
          }
          typeHandle
          fullHeight
        }
        ... on Craft_kiberaStoryBuilder_threePieceLayout_BlockType {
          typeHandle
          titleText
          textField
          titleSize
          secondaryTextField
          textPosition
          captionLeft
          captionRight
          textOnImageLeft
          textOnImageRight
          leftImageSize
          rightImageSize
          leftUrl {
            url
          }
          rightUrl {
            url
          }
          leftImage {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                }
              }
            }
          }
          rightImage {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                }
              }
            }
          }
        }
        ... on Craft_kiberaStoryBuilder_collaboration_BlockType {
          titleField
          typeHandle
          introduction
          description
          leftImage {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                }
              }
            }
          }
          rightImage {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                }
              }
            }
          }
          leftImageCaption
          rightImageCaption
        }
      }
      seomatic {
        ... on Craft_SeomaticType {
          metaJsonLdContainer
          metaLinkContainer
          metaScriptContainer
          metaSiteVarsContainer
          metaTagContainer
          metaTitleContainer
        }
      }
    }
  }
`

// export const query = graphql`
//   query {
//     heroImage: file(relativePath: { eq: "kibera/kibera-hero.jpg" }) {
//       childImageSharp {
//         fluid(maxWidth: 1800, quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp_noBase64
//         }
//       }
//     }
//     explainRightImage: file(relativePath: { eq: "kibera/img_8162.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     explainBottomImage: file(relativePath: { eq: "kibera/samuel_3a.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaSchoolKids: file(
//       relativePath: { eq: "kibera/parallax/kibera-school-kids.jpg" }
//     ) {
//       childImageSharp {
//         fluid(maxWidth: 370, quality: 100) {
//           presentationWidth
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     aerialImage: file(relativePath: { eq: "kibera/aerial.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     vickysPlaceImage: file(relativePath: { eq: "kibera/vickys-place.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaChurchCurtainImage: file(
//       relativePath: { eq: "kibera/kibera-church-curtain.jpg" }
//     ) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     boomBoxImage: file(relativePath: { eq: "kibera/boombox.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     soundSystemsAvailableImage: file(
//       relativePath: { eq: "kibera/sound-systems-available.jpg" }
//     ) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaDudes: file(
//       relativePath: { eq: "kibera/parallax/kibera-dudes.jpg" }
//     ) {
//       childImageSharp {
//         fluid(maxWidth: 645, quality: 100) {
//           presentationWidth
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     attitudeImage: file(relativePath: { eq: "kibera/kibera-attitude.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kobeKibera: file(relativePath: { eq: "kibera/parallax/kobe-kibera.jpg" }) {
//       childImageSharp {
//         fluid(maxWidth: 434, quality: 100) {
//           presentationWidth
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     busStopImage: file(relativePath: { eq: "kibera/kibera-busstop.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaWoman: file(
//       relativePath: { eq: "kibera/parallax/kibera-woman.jpg" }
//     ) {
//       childImageSharp {
//         fluid(maxWidth: 336, quality: 100) {
//           presentationWidth
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaDapper: file(
//       relativePath: { eq: "kibera/parallax/kibera-dapper.jpg" }
//     ) {
//       childImageSharp {
//         fluid(maxWidth: 336, quality: 100) {
//           presentationWidth
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     hoodImage: file(relativePath: { eq: "kibera/kibera-hood.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     hoodImageMob: file(relativePath: { eq: "kibera/kibera-hood-mob.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     barberShopImage: file(
//       relativePath: { eq: "kibera/kibera-barber-shop.jpg" }
//     ) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     nileRiverBarberShopImage: file(
//       relativePath: { eq: "kibera/nile-river-barber-shop.jpg" }
//     ) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     alleyWayImage: file(relativePath: { eq: "kibera/img_8135.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     shabazzPalacesImage: file(
//       relativePath: { eq: "kibera/shabazz-palaces.jpg" }
//     ) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     pitchChainImage: file(relativePath: { eq: "kibera/pitch-chain.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaViewImage: file(relativePath: { eq: "kibera/kibera-view.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     streetViewImage: file(relativePath: { eq: "kibera/street-view.jpg" }) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//     kiberaSportsHotel: file(
//       relativePath: { eq: "kibera/parallax/kibera-sports-hotel.jpg" }
//     ) {
//       childImageSharp {
//         fluid(quality: 100) {
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }
//   }
// `
export default KiberaPage
