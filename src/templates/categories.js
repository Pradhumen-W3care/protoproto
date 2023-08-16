import React, { useContext, useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "@components/Layout";
import TransitionLinkFade from "@components/TransitionLinkCategory";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/categories.css";
import { useLocation } from "@reach/router";
import { myContext } from "../context/provider";

const Category = ({ data, pageContext }) => {

  const [currency, setCurrency] = useState("USD")
  const { currencys } = useContext(myContext)

   // Load the selected currency from session storage when the component mounts
   useEffect(() => {
    const storedCurrency = sessionStorage.getItem("selectedCurrency")
    if (storedCurrency) {
      setCurrency(storedCurrency)
    }
  }, [])

  // Function to handle currency change
  const handleCurrencyChange = selectedCurrency => {
    setCurrency(selectedCurrency)
    sessionStorage.setItem("selectedCurrency", selectedCurrency)
  }



  const location = useLocation();
  const slug = location.pathname.split("/").pop();

  const { craftCategoryInterface: entry } = data;

  const craftCollaborationsProduct = data.craftCollaborationsProduct;
  const craftCategoryInterface = data.craftCategoryInterface;

  const banner =
    craftCategoryInterface && craftCategoryInterface.categoryImage
      ? craftCategoryInterface.categoryImage
      : "";

  const productData = data.allCraftCollaborationsProduct.nodes
    ? data.allCraftCollaborationsProduct.nodes
    : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Transition speed (1 second)
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000, // Static display duration (4 seconds)
  };

  const imageStyle = {};

  // Define a state variable to store the window width
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout showNav={true} selectedCurrency={currency}
    onChange={handleCurrencyChange}>
      <div>
        <Slider className="category-banner" {...settings}>
          {banner &&
            banner.length > 0 &&
            banner.map((categoryData, i) => {
              const imageUrl =
              windowWidth <= 768
                ? categoryData.mobileImage[0].url || ""
                : categoryData.webImage[0].url || "";

              return (
                <React.Fragment key={i}>
                  (
                    
                    <img
                      className=""
                      alt="image"
                      style={imageStyle}
                      src={imageUrl}
                    />
                  ) 
                  
                </React.Fragment>
              )
            })}
        </Slider>
      </div>

      {slug && (
        <div className="category-inner">
          <div className="container">
            <div className="main-content">
              <h1 className="main-page-title">
                {craftCategoryInterface?.title}
              </h1>

              {craftCategoryInterface && (
                <div
                  className="main-page-content"
                  dangerouslySetInnerHTML={{
                    __html: craftCategoryInterface.pageContent
                      .replace(/<p>/g, "")
                      .replace(/<\/p>/g, ""),
                  }}
                ></div>
              )}
            </div>

            <div className="main-categoy-products">
              <div className="product-row">
                {productData.map((product, index) => (
                  <Link className="category-anchor" to={`/${product.uri}`}>
                    <div className="product-item-category" key={index}>
                      <div className="product-item-post">
                        {product.productGallery.length > 0 && (
                          <img
                            src={product.productGallery[0].localFile.publicURL}
                            alt={product.title}
                          />
                        )}
                        <div className="category-product-details">
                          <h2 className="mt-2 font-bold">
                            {product && product.title ? product.title : null}
                          </h2>
                          <h3>
                            {product && product.subtitle
                              ? product.subtitle
                              : null}
                          </h3>
                          <h3>
                            Edition of{" "}
                            <span className="stock-level">
                              {product && product.productEditions
                                ? product.productEditions
                                : null}
                            </span>{" "}
                          </h3>
                          <span>
                          {currencys} {currencys === 'USD' ? product.price[0].usdPrice+'.00' : currencys === 'EUR' ? product.price[0].euroPrice+'.00' : currencys === 'AUD' ? product.price[0].audPrice+'.00' : <></> }
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    craftCategoryInterface(slug: { eq: $slug }) {
      id
      title
      slug
      ... on Craft_productCategories_Category {
        id
        categoryImage {
          ... on Craft_categoryImage_categoryimage_BlockType {
            id
            webImage {
              url
            }
            mobileImage {
              url
            }
          }
        }
        pageContent
      }
    }
    craftCollaborationsProduct(
      productCategories: { elemMatch: { slug: { eq: $slug } } }
    ) {
      ... on Craft_collaborations_Product {
        id
        title
        slug
        productEditions
        productImage {
          ... on Craft_uploads_Asset {
            url
          }
        }
      }
      defaultPrice
      defaultPriceAsCurrency
      availableForPurchase
    }

    allCraftCollaborationsProduct(
      filter: { productCategories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        title
        productEditions
        defaultPrice
        defaultPriceAsCurrency
        slug
        uri
        productGallery {
          id
          ... on Craft_uploads_Asset {
            localFile {
              publicURL
            }
          }
        }
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
`;


export default Category
