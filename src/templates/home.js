/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "@components/Layout"
import SEO from "@components/seo"
import Slider from "react-slick"
import styles from "../styles/categories.css"

import PrevArrow from "@components/PrevArrow"
import NextArrow from "@components/NextArrow"
import { myContext } from "../context/provider"

export const euroPrice = "euroPrice";
export const usdPrice = "usdPrice";
export const audPrice = "audPrice";

const HomePage = ({ data }) => {


  // Initialize currency state with "USD"
  const [currency, setCurrency] = useState("USD")
  const { currencys } = useContext(myContext)
  

  // Load the selected currency from session storage when the component mounts
  useEffect(() => {
    const storedCurrency = typeof sessionStorage !== 'undefined' && sessionStorage.getItem("selectedCurrency")
    if (storedCurrency) {
      setCurrency(storedCurrency)
    }
  }, [])

  // Function to handle currency change
  const handleCurrencyChange = selectedCurrency => {
    setCurrency(selectedCurrency)
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.setItem("selectedCurrency", selectedCurrency)
  }



  const banner = data.craftHomeHomeEntry.bannerImage
    ? data.craftHomeHomeEntry.bannerImage
    : ""



  const shortDescription = data.craftHomeHomeEntry.shortDescription
    ? data.craftHomeHomeEntry.shortDescription
    : ""

  const shopByCollection = data.craftHomeHomeEntry.shopByCollection
    ? data.craftHomeHomeEntry.shopByCollection
    : ""

  const protoFavourite = data.craftHomeHomeEntry.productCollections
    ? data.craftHomeHomeEntry.productCollections
    : ""

  console.log(protoFavourite[0].product[0].price[0].euroPrice+"hi")

  const additionAttribute = data.craftHomeHomeEntry.additionAttribute
    ? data.craftHomeHomeEntry.additionAttribute
    : ""
  const homePageStories = data.craftHomeHomeEntry.homePageStories
    ? data.craftHomeHomeEntry.homePageStories
    : ""

  const shopByMake = data.craftHomeHomeEntry.shopByMake
    ? data.craftHomeHomeEntry.shopByMake
    : ""

  // Wrap the code using window in a check for window object
  let currentUrl
  if (typeof window !== "undefined") {
    currentUrl = window.location.href
  } else {
    currentUrl = "" // Define a default value if needed
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const settingsnew = {
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "115px",
    focusOnSelect: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 2, // Show three slides on tablets
        },
      },
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 2, // Show two slides on mobile devices
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 767, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show two slides on mobile devices
          centerPadding: "0px",
        },
      },
    ],
  }

  const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "130px",
    focusOnSelect: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 3, // Show three slides on tablets
        },
      },
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 2, // Show two slides on mobile devices
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 767, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show two slides on mobile devices
          centerPadding: "60px",
        },
      },
    ],
  }

  const settingsnew4 = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    centerPadding: "250px",
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          centerPadding: "130px",
        },
      },
      {
        breakpoint: 1100,
        settings: {
          centerPadding: "70px",
        },
      },
      {
        breakpoint: 990,
        settings: {
          centerPadding: "0px",
        },
      },
    ],
    cssEase: "linear", // Custom CSS to adjust the transition easing
  }

  const settingsgallery = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  // Define a state variable to store the window width
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const headerComponent = (
    <>
      <Slider className="home-mainbanner category-banner m-0" {...settings}>
        {banner &&
          banner.length > 0 &&
          banner.map((banner, i) => {
            const imageUrl =
              windowWidth <= 768
                ? banner.mobileBanner[0]
                  ? banner.mobileBanner[0].url
                  : "" || ""
                : banner.fullScreenBanner[0]
                ? banner.fullScreenBanner[0].url
                : "" || ""

            return (
              <div key={i} className="image-container">
                <img
                  className=""
                  src={imageUrl}
                  alt={`Image ${i + 1}`}
                />
                <div className="image-details">
                  <h3 className="homeBannerTitle">{banner.bannertitle}</h3>
                  <small className="homeBannersubTitle">
                    {banner.subtitle}
                  </small>
                  <button className="Shopbutton">Shop Now</button>
                </div>
              </div>
            )
          })}
      </Slider>
    </>
  )

  return (
    <Layout
      header={headerComponent}
      selectedCurrency={currency}
      onChange={handleCurrencyChange}
    >
      <SEO title="" />

      <div className="home-page-paragraph">
        <div className="container">
          <p className="text-center leading-snug section-rte 2xl:text-2.5xl xl:text-2xl lg:text-xl text-xl lg:leading-1.8 xl:leading-2.2 2xl:leading-2.2">We started with an idea that c<span style={{fontFamily: 'Proto4'}}>OO</span>lshi<span style={{fontFamily: 'Proto2'}}>T</span> could also be cool for the <span  style={{fontFamily: 'Proto1'}}>p</span>e<span style={{fontFamily: 'Proto6'}}>o</span>ple who make it-Now we’re running design colabs with makers from ar<span style={{fontFamily: 'Proto2'}}>O</span>und <span style={{fontFamily: 'Proto6'}}>t</span>he w<span style={{fontFamily: 'Proto5'}}>O</span><span style={{fontFamily: 'Proto1'}}>R</span>ld</p>
        </div>
      </div>

      <div className="collection">
        <div className="container">
          <h1 className="shop-by-collection-heading">Shop by collection</h1>
        </div>
        <Slider {...settingsnew}>
          {shopByCollection.map((product, index) => (
            <a
            href={
              product && product.product && product.product[0]
                ? currentUrl +
                  "shop/collaborations/" +
                  product.product[0].slug
                : ""
            }
          >
            <div key={index}>
              <img
                className="shop-collection-slider"
                src={product.image[0] ? product.image[0].url : ""}
                alt={product.shoptitle}
              />
              <p className="mt-2">{product.shoptitle}</p>
            </div>
            </a>
          ))}
        </Slider>
      </div>

      <div className="favourites">
        <div className="container">
          <h2 className="proto-favourit-title">Proto favourites</h2>
        </div>

        <Slider {...settings3}>
          {protoFavourite.map((product, index) => (
            <a
              href={
                product && product.product && product.product[0]
                  ? currentUrl +
                    "shop/collaborations/" +
                    product.product[0].slug
                  : ""
              }
            >
              <div className="product-item-category" key={index}>
                {/* Your product item content */}
                <div className="product-item-post">
                  {/* Product image */}
                  {product.featureImage.length > 0 && (
                    <img
                      src={
                        product &&
                        product.featureImage[0] &&
                        product.featureImage[0].url
                          ? product.featureImage[0].url
                          : ""
                      }
                      alt={
                        product &&
                        product.product[0] &&
                        product.product[0].title
                          ? product.product[0].title
                          : ""
                      }
                    />
                  )}

                  {/* Product details */}
                  <div className="category-product-details  p-4">
                    <h2 className="mt-2 mb-0.5 font-bold">
                      {product &&
                      product.product &&
                      product.product[0] &&
                      product.product[0].title
                        ? product.product[0].title
                        : ""}
                    </h2>
                    <h3>
                      {product && product.subtitle ? product.subtitle : null}
                    </h3>

                    {
                      <h3>
                        Edition of{" "}
                        <span className="stock-level">
                          {product && product.productedition && product.productedition ? product.productedition : ''}
                        </span>{" "}
                        only{" "}
                      </h3>
                    }

                    <h3>
                      {currencys} { currencys === 'USD' ? product.product[0].price[0].usdPrice : currencys === 'EUR' ? product.product[0].price[0].euroPrice : currencys === 'AUD' ? product.product[0].price[0].audPrice :<></> }
                    </h3>
                    <span></span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </Slider>
      </div>

      <div className="extra-ethical">
        <div className="container">
          <div className="containerr">
            {additionAttribute.map((attribute, key) => (
              <div className="box">
                <div className="containernew">
                  <div className="box2">
                    <img
                      className="small-image"
                      src={attribute.attributeIcon[0].url}
                      alt=""
                    />
                  </div>
                  <div className="box2 ml-5">{attribute.attributeTitle}</div>
                </div>
                <p>{attribute.attributeParagraph}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="stories2 coll-mid-slider">
        <div className="container">
          <h1 className="shop-by-collection-heading">Stories</h1>
        </div>
        <Slider {...settingsnew4}>
          {homePageStories.map((image, index) => (
            <div key={index}>
              <a href="/stories"><img
                className="shop-collection-slider"
                src={
                  image && image.storyImage[0] && image.storyImage[0].url
                    ? image.storyImage[0].url
                    : ""
                }
                alt={image.storyTitle}
              /></a>
              <p className="my-3 uppercase">{image.storyTitle}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="shop-make">
        <div className="container">
          <h2 className="shop-by-maker-heading ">Shop by maker</h2>

          <div className="imageGallery">
            {shopByMake.map((image, index) => (
              <div key={index} className="imageContainer">
                <img
                  className="Shop-by-image"
                  src={
                    image && image.imageattr[0] && image.imageattr[0].url
                      ? image.imageattr[0].url
                      : ""
                  }
                  alt={image.imagetitle}
                />
                <p className="imageTitle uppercase">{image.imagetitle}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="imageGalleryMob">
          <Slider {...settingsgallery}>
            {shopByMake.map((image, index) => (
              <div key={index} className="imageContainer">
                <img
                  className="Shop-by-image"
                  src={
                    image && image.imageattr[0] && image.imageattr[0].url
                      ? image.imageattr[0].url
                      : ""
                  }
                  alt={image.imagetitle}
                />
                <p className="imageTitle">{image.imagetitle}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    craftHomeHomeEntry {
      id
      bannerImage {
        ... on Craft_bannerImage_bannerimage_BlockType {
          id
          bannertitle
          subtitle
          shoplink
          fullScreenBanner {
            id
            url
          }
          mobileBanner {
            id
            url
          }
        }
       
      }
      shopByCollection {
        ... on Craft_shopByCollection_shopImage_BlockType {
          id
          image {
            id
            url
          }
          shoptitle
          product {
            url
            id
            slug
            title
            ... on Craft_collaborations_Product {
              price {
                ... on Craft_price_price_BlockType {
                  id
                  audPrice
                  usdPrice
                  euroPrice
                }
              }
            }
          }
        }
      }
      shortDescription
      productCollections {
        ... on Craft_productCollections_product_BlockType {
          id
          productedition
          product {
            url
            id
            slug
            title
            ... on Craft_collaborations_Product {
              price {
                ... on Craft_price_price_BlockType {
                  id
                  audPrice
                  usdPrice
                  euroPrice
                }
              }
            }
          }
          featureImage {
            id
            url
          }
          euroPrice
          usdPrice
        }
      }
      additionAttribute {
        ... on Craft_additionAttribute_additionAttribute_BlockType {
          id
          attributeIcon {
            id
            url
          }
          attributeParagraph
          attributeTitle
        }
      }
      homePageStories {
        ... on Craft_homePageStories_homePageStories_BlockType {
          id
          storyImage {
            id
            url
          }
          storyTitle
        }
      }
      shopByMake {
        ... on Craft_shopByMake_shopByMake_BlockType {
          id
          imageattr {
            id
            url
          }
          imagetitle
        }
      }
    }
  }
`

export default HomePage
