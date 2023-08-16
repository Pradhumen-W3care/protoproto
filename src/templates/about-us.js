import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import SEO from "../components/seo"
import CallToActionList from "@components/CallToAction/List"
import CallToActionPanel from "@components/CallToAction/Panel"
import TextSection from "../components/TextSection"
import ImageWithHeading from "@components/ImageWithHeading"

const AboutUsPage = ({ data }) => {
  const { craftAboutUsAboutUsEntry: entry } = data

  const {
    seomatic,
    heroImage: [heroImage],
  } = entry


 

  // Use a HOC to show a preloader while the header image is loading
  // const ImageWithPreLoader = withImagePreLoader(ImageWithHeading)
  const headerComponent = (
    <ImageWithHeading
      className="h-screen text-centered"
      tag="h1"
      position="bottom"
      sources={
        heroImage.image?.[0]?.localFile?.childImageSharp?.gatsbyImageData
      }
      mobileSources={
        heroImage.mobileImage?.[0]?.localFile?.childImageSharp?.gatsbyImageData
      }
      heading={heroImage.heading}
      alt="ProtoProto Hero Image"
      loading={"eager"}
    />
  )

  return (
    <Layout header={headerComponent} showNav={false} seomatic={seomatic}>
      <TextSection full text={entry.fullHeightText} />
      {/* Full Height Images */}
      {entry.fullHeightImages.map((imageSources, i) => {
        if (!imageSources?.image?.length) return null
       
        const image =
          imageSources?.image[0]?.localFile?.childImageSharp?.gatsbyImageData
        const mobileImage =
          imageSources?.mobileImage[0]?.localFile?.childImageSharp
            ?.gatsbyImageData
          
        return (
          <ImageWithHeading
            key={i}
            className="h-content"
            sources={image}
            mobileSources={mobileImage}
            position="center"
            heading={imageSources.heading}
            tag="h2"
          />
        )
      })}
      {entry.callToActions && (
        <CallToActionList>
          {entry.callToActions.map((callToAction, i) => {

           
            const {
              image: [{ localFile }],
            } = callToAction
            const {
              linkField: [{ slug }],
            } = callToAction
            const { titleField } = callToAction
            console.log(slug);
            return (
              <CallToActionPanel
                key={i}
                imgSrc={localFile}
                url={slug}
                title={titleField}
              />
            )
          })}
        </CallToActionList>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    craftAboutUsAboutUsEntry {
      fullHeightText
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
          mobileImage {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100, 
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
        }
      }
      fullHeightImages {
        ... on Craft_fullHeightImages_image_BlockType {
          heading
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
          mobileImage {
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
      }
      callToActions {
        ... on Craft_callToActions_callToAction_BlockType {
          titleField
          linkField {
            slug
          }
          image {
            ... on Craft_uploads_Asset {
              url
              title
              hasFocalPoint
              localFile {
                childImageSharp {
                  gatsbyImageData(height: 628, width: 684, quality: 100)
                }
              }
            }
          }
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

export default AboutUsPage
