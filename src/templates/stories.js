import React, { useMemo } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "@components/Layout"
import TransitionLink from "../components/TransitionLink"

const StoriesPage = ({ data }) => {
  const { craftStoriesIndexStoriesIndexEntry: entry } = data
  const { seomatic, storyCollections } = entry

  /* Story block component: either a link or static image */
  const StoryBlock = useMemo(
    () =>
      ({ image, comingSoon, title, eager }) =>
        (
          <>
            <GatsbyImage
              image={image}
              className={`w-full h-full ${
                comingSoon ? "image--greyscale" : ""
              }`}
              loading={eager ? `eager` : `lazy`}
              alt=""
            />
            <div className="flex absolute top-1/2 left-1/2 lg:text-2xl md:text-xl text-2xl uppercase">
              <div className="flex-1 stories">{title ?? ``}</div>
              {comingSoon && <div className="stories text-center">Coming Soon</div>}
            </div>
          </>
        ),
    []
  )

  return (
    <Layout showNav={true} seomatic={seomatic}>
      <div className="container mx-auto overflow-hidden md:pt-48 pt-24">
        <div className="md:px-0 px-6">
          <div className="flex items-center justify-center flex-wrap">
            {/* Loop and render each story */}
            {storyCollections.length > 0 &&
              storyCollections.map(({ featureImage, entry, comingSoon }, i) => {
                const [story] = entry
                const [img] = featureImage

                return (
                  <div
                    key={i}
                    className={`md:w-1/3 w-full mb-6 relative ${
                      comingSoon ? "text-grey" : ""
                    }`}
                  >
                    {/* Link wrapper */}
                    {!comingSoon && (
                      <TransitionLink
                        key={i}
                        to={`/${story && story.uri ? story.uri : ``}`}
                      >
                        <StoryBlock
                          image={getImage(img?.localFile)}
                          title={story?.title}
                          comingSoon={comingSoon}
                          eager={i > 2}
                        />
                      </TransitionLink>
                    )}

                    {/* Static image */}
                    {comingSoon && (
                      <StoryBlock
                        image={getImage(img?.localFile)}
                        title={story?.title}
                        comingSoon={comingSoon}
                        eager={i > 2}
                      />
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    craftStoriesIndexStoriesIndexEntry {
      ... on Craft_storiesIndex_storiesIndex_Entry {
        storyCollections {
          ... on Craft_storyCollections_story_BlockType {
            entry {
              uri
              title
            }
            comingSoon
            featureImage {
              ... on Craft_uploads_Asset {
                url
                title
                hasFocalPoint
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      height: 600
                      width: 800
                      quality: 100
                      layout: CONSTRAINED
                    )
                  }
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

export default StoriesPage
