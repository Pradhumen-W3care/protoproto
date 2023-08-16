import React, { useContext, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, navigate } from "gatsby"

import { Api } from "@utilities"
import { myContext } from "../../context/provider"


// Custom components
import Layout from "@components/Layout"
import TextSection from "@components/TextSection"
import ImageWithHeading from "@components/ImageWithHeading"
import CraftErrors from "@components/CraftErrors"
import StockLevel from "@components/StockLevel"

// Product Components
import ProductEditorialText from "@components/Product/Editorial/Text"
import ProductEditorialImage from "@components/Product/Editorial/Image"
import ProductEditorialVideo from "@components/Product/Editorial/Video"
import ProductEditorialLargeImage from "@components/Product/Editorial/LargeImage"
import ProductCollaborationPanels from "@components/Product/Collaboration/Panels"
import ProductCollaborationTagLine from "@components/Product/Collaboration/TagLine"
import ProductGallerySwiper from "@components/Product/Collaboration/ProductGallerySwiper"
import ProductDetailsAccordion from "@components/Product/Collaboration/ProductDetailsAccordion"

/**
 * Collections Page
 * @author Josh Smith <me@thejoshsmith.dev>
 */
const CollaborationsTemplate = ({ data }) => { 

  const { currencys } = useContext(myContext)

  // Extract product and variant data
  const {
    craftCollaborationsProduct: product,
    craftCollaborationsProduct: {
      variants: [variant],
    },
  } = data

  const { siteCart, setSiteCart } =
    useContext(myContext)

  const { seomatic } = product

  // Images
  const productMainImage =
    product?.productImage[0]?.localFile?.childImageSharp?.gatsbyImageData
  const { productGallery } = product

  const [errors, setErrors] = useState([])
  const [addToBagLabel, setAddToBagLabel] = useState("Add to cart")

  const accordionItems = [
    { uid: "story", title: "Story", content: product.productStory },
    { uid: "details", title: "Details", content: product.productDetails },
    {
      uid: "shipping",
      title: "Shipping",
      content: product.productShippingDetails,
    },
  ]

  return (
    <Layout showNav={true} seomatic={seomatic}>
      <div className="mx-auto overflow-hidden">
        {/* Product main image */}
        {productMainImage && (
          <div className="flex">
            <div
              className={`${
                product.fullScreen ? `w-full` : `w-10/12 mx-auto px-6`
              }`}
            >
              <div
                className={`lg:flex flex-col hidden pt-16 px-24 h-screen justify-center`}
              >
                <GatsbyImage
                  image={productMainImage}
                  imgStyle={{ objectFit: "contain" }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        )}
        {/* Product Swiper on mobile */}
        <div className={`lg:hidden mb-2 md:mb-4 pt-16`}>
          <ProductGallerySwiper
            type="bullets"
            navigation={false}
            images={productGallery}
          />
        </div>
        <div
          className={`${product.fullScreen ? `lg:mt-12` : ``} px-6 ${
            !productMainImage ? `lg:pt-32` : `` // Add a bit of padding above the product slider and details if there's no main image, to prevent it looking weird...
          }`}
        >
          <div className="flex -mx-6 mb-8">
            <div className="lg:w-5/12 ml-auto w-full px-6">
              <div className="lg:w-full md:w-2/3 w-full mx-auto">
                {/* Product details */}
                <div className="text-center leading-snug md:mb-16 mb-10">
                  {/* Wrapper for added padding on mobile */}
                  <div className="md:px-0 px-6">
                    {/* Edition on mobile sits above title */}
                    {product.productEditions && (
                      <div className="text-lg mb-2 block md:hidden">
                        <StockLevel stock={product.productEditions} />
                      </div>
                    )}
                    <h1 className="text-1.5xl font-bold mb-5 md:mb-1.5">
                      {product.title}
                    </h1>
                    {product.productEditions && (
                      <div className="text-lg mb-5 hidden md:block">
                        <StockLevel stock={product.productEditions} />
                      </div>
                    )}
                    <div className="text-xl mb-6">{currencys == "EUR" ? `€ ` : currencys == "USD" ? `$ `:currencys == "AUD" ? `A$ `:''}{variant.salePrice}</div>
                  </div>
                  <button
                    onClick={() =>
                      handleAddToBag(variant.id, setAddToBagLabel, setErrors, siteCart, setSiteCart)
                    }
                    className="btn-pri md:w-auto w-full"
                  >
                    {addToBagLabel}
                  </button>
                  {errors && (
                    <div className="mt-4">
                      <CraftErrors errors={errors} />
                    </div>
                  )}
                </div>
                {/* Product Accordion */}
                <ProductDetailsAccordion
                  items={accordionItems}
                  preExpanded="story"
                />
              </div>
            </div>
            <div className="w-5/12 mr-auto lg:block hidden px-6">
              {/* Product Image Swiper */}
              <div className="ml-auto" style={{ maxWidth: "545px" }}>
                <ProductGallerySwiper images={productGallery} />
              </div>
            </div>
          </div>
          {product?.productCollaboration?.length ? (
            <ProductCollaborationTagLine />
          ) : null}
        </div>
      </div>
      {product.productCollaboration && (
        <ProductCollaborationPanels
          data={product.productCollaboration.map(collab => {
            const {
              image: [
                {
                  localFile: {
                    childImageSharp: { gatsbyImageData: img },
                  },
                },
              ],
            } = collab

            return {
              img,
              title: collab.titleField,
              content: collab.details,
            }
          })}
        />
      )}
      {product.productEditorial &&
      // eslint-disable-next-line array-callback-return
      product.productEditorial.map((block, i) => {
        // eslint-disable-next-line default-case
        switch (block.__typename) {
          case "Craft_productEditorial_textBlock_BlockType":
            return <ProductEditorialText key={i} text={block.textField} />

          case "Craft_productEditorial_image_BlockType":
            return (
              <ProductEditorialImage key={i} src={block.image[0].localFile} />
            )

          case "Craft_productEditorial_largeImage_BlockType":
            return (
              <ProductEditorialLargeImage
                key={i}
                src={block.image[0].localFile}
              />
            )

          case "Craft_productEditorial_video_BlockType":
            return (
              <ProductEditorialVideo
                key={i}
                title={block.titleField}
                src={block.video}
              />
            )

          case "Craft_productEditorial_fullHeightImage_BlockType":
            const {
              image: [
                {
                  localFile: {
                    childImageSharp: { gatsbyImageData: sources },
                  },
                },
              ],
            } = block
            return (
              <ImageWithHeading
                key={i}
                className="h-content"
                sources={sources}
                heading={block.heading}
              />
            )

          case "Craft_productEditorial_fullHeightText_BlockType":
            return <TextSection key={i} text={block.textField} />
        }
      })}
    </Layout>
  )
}

/**
 * handles adding an item to the bag
 * @author Josh Smith <josh@batch.nz>
 * @param  integer   purchasableId    ID of the variant to add to bag
 * @param  function  setAddToBagLabel Method to update the button label
 * @return void
 */

const handleAddToBag = async (purchasableId, setAddToBagLabel, setErrors, siteCart, setSiteCart) => {
  setAddToBagLabel("Loading...")

  const navigateToCheckout = cart => navigate("/checkout", { state: { cart } })

  let purchasables = []
  // Proceed directly to the checkout if we already have this item in the cart
  try {
    const { cart } = await Api.getCart()
    setSiteCart(cart)


  } catch (err) {
    // Todo, handle the request error
  }

  purchasables.push({'id': purchasableId})
  // }


  // Add a new line item to the cart
  try {
    const { success, errors, cart } = await Api.updateCart({
      purchasables
    })
    setSiteCart(cart)

    if (!success) {
      setAddToBagLabel("Add to cart")
      return setErrors(errors)
    }
    setAddToBagLabel("Added to cart")
  } catch (err) {
    // Todo, handle the request error
  }
}

export const query = graphql`
  query ($slug: String!) {
    craftCollaborationsProduct(slug: { eq: $slug }) {
      title
      variants {
        ... on Craft_collaborations_Variant {
          id
          length
          width
          stock
          salePrice
        }
      }
      ... on Craft_collaborations_Product {
        productStory
        productDetails
        productShippingDetails
        productEditions
        productCollaboration {
          ... on Craft_productCollaboration_collaborator_BlockType {
            titleField
            details
            image {
              ... on Craft_uploads_Asset {
                url
                title
                hasFocalPoint
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
            }
          }
        }
        productImage {
          ... on Craft_uploads_Asset {
            url
            title
            hasFocalPoint
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  placeholder: NONE
                  layout: FULL_WIDTH
                )
              }
            }
          }
        }
        fullScreen
        productGallery {
          ... on Craft_uploads_Asset {
            url
            title
            hasFocalPoint
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
        productEditorial {
          ... on Craft_productEditorial_textBlock_BlockType {
            __typename
            textField
          }
          ... on Craft_productEditorial_image_BlockType {
            __typename
            image {
              ... on Craft_uploads_Asset {
                url
                title
                hasFocalPoint
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      width: 636
                      height: 636
                      quality: 100
                      layout: CONSTRAINED
                    )
                  }
                }
              }
            }
          }
          ... on Craft_productEditorial_largeImage_BlockType {
            __typename
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
          }
          ... on Craft_productEditorial_video_BlockType {
            __typename
            titleField
            video
          }
          ... on Craft_productEditorial_fullHeightText_BlockType {
            __typename
            textField
          }
          ... on Craft_productEditorial_fullHeightImage_BlockType {
            __typename
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
      price {
        ... on Craft_price_price_BlockType {
          id
          usdPrice
          audPrice
          euroPrice
        }
      }
    }
  }
`

export default CollaborationsTemplate
