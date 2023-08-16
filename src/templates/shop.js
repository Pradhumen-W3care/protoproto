import React, { useContext, useMemo } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "@components/Layout"
import StockLevel from "@components/StockLevel"
import TransitionLink from "../components/TransitionLink"
import { myContext } from "../context/provider"

const ShopTemplate = ({ data }) => {
  const { craftShopShopEntry: entry } = data
  const { seomatic, productCollections } = entry
  const activeProduct = []

  const { currencys } = useContext(myContext)


  const price = data.craftShopShopEntry.productCollections[0].product[0].price[0];
  

  productCollections.forEach((obj) => {
    if (Object.keys(obj.product).length !== 0) {
      activeProduct.push(obj)
    }
  })

  /* Story block component: either a link or static image */
  const StoryBlock = useMemo(  () => ({ image, title, productEditions, defaultPriceAsCurrency, comingSoon, eager, price}) =>

        { return (
          <>
            <GatsbyImage
              image={image}
              className={`w-full h-full ${
                comingSoon ? "image--greyscale" : ""
              }`}
              loading={eager ? `eager` : `lazy`}
              alt=""
            />
            <div className="mt-2 mb-0.5 font-bold">{title}</div>
            {comingSoon && <div className="mt-2">Coming Soon</div>}
            {!comingSoon && productEditions && (
              <StockLevel stock={productEditions} />
            )}
            <div className="mt-1">{currencys == "EUR" ? `€ ${price[0]?.euroPrice}` : currencys == "USD" ? `$ ${price[0]?.usdPrice}`:currencys == "AUD" ? `A$ ${price[0]?.audPrice}`:''}</div>
          </>
        )},
    [currencys]
  )

  return (
    <Layout showNav={true} seomatic={seomatic}>
      <div className="container mx-auto overflow-hidden md:pt-32 pt-28">
        <div className="md:px-0 px-6">
          <div className="flex items-center justify-center flex-wrap">
            {/* Loop and render each product */}
            {activeProduct.length > 0 &&
            activeProduct.map(
                ({ featureImage, product: products, comingSoon }, i) => {

                  const [product] = products
                  const [img] = featureImage

                  return (
                    <div
                      key={i}
                      className={`sm:w-5/12 lg:w-1/4 w-full mb-auto pb-7 md:pb-14 sm:mx-3 ${
                        comingSoon ? "text-grey" : ""
                      }`}
                    >
                      {/* Link wrapper */}
                      {!comingSoon && product?.uri && (
                        <TransitionLink key={i} to={`/${product.uri}`}>
                          <StoryBlock
                            image={getImage(img?.localFile)}
                            title={product.title}
                            productEditions={product.productEditions}
                            defaultPriceAsCurrency={
                              product.defaultPriceAsCurrency
                            }
                            price={product.price}
                            comingSoon={comingSoon}
                            eager={i > 2}
                          />
                        </TransitionLink>
                      )}

                      {/* Static image */}
                      {comingSoon && (
                        <StoryBlock
                          image={getImage(img?.localFile)}
                          title={product.title}
                          productEditions={product.productEditions}
                          defaultPriceAsCurrency={
                            product.defaultPriceAsCurrency
                          }
                          comingSoon={comingSoon}
                          eager={i > 2}
                        />
                      )}
                    </div>
                  )
                }
              )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    craftShopShopEntry {
      ... on Craft_shop_shop_Entry {
        productCollections {
          ... on Craft_productCollections_product_BlockType {
            product {
              title
              uri
              defaultPriceAsCurrency
              ... on Craft_collaborations_Product {
                productEditions
                price {
                  ... on Craft_price_price_BlockType {
                    id
                    audPrice
                    usdPrice
                    euroPrice
                  }
                }
              }
              variants {
                ... on Craft_collaborations_Variant {
                  stock
                }
              }
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
                      aspectRatio: 0.8
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

export default ShopTemplate
