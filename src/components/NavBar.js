import React, { useState, useContext, useEffect } from "react"
import gsap from "gsap"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Transition } from "react-transition-group"
import TransitionLink from "./TransitionLink"
import TransitionLinkFade from "./TransitionLink"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import Cart from "./Cart"
import { Api } from "@utilities"
import CurrencySelector from "@components/currencyselector"

import {
  ShoppingBag as ShoppingBagIcon,
  Menu as MenuIcon,
  X as CloseIcon,
} from "@components/Icons"

import { myContext } from "../context/provider"

const NavBar = () => {
  const [selectedCurrency, setSelectedCurrency] = React.useState("USD")

  const handleCurrencyChange = currency => {
    setSelectedCurrency(currency)
    // You can add additional logic here to update the currency in window.sessionStorage or any other global state management, if required.
  }

  const {
    visibleNavBar,
    mobileMenuVisible,
    setMobileMenuVisible,
    siteCart,
    setSiteCart,
  } = useContext(myContext)
  const [newCart, setNewCart] = useState(siteCart)
  const [count, setCount] = useState(false)

  useEffect(() => {
    setSiteCart(newCart)
  }, [])
  useEffect(() => {
    const getNewCart = async () => {
      const { cart } = await Api.getCart()
      await setNewCart(cart)
      await setCount(cart.totalQty)
      return cart
    }
    getNewCart()
  }, [siteCart])

  const [show, setShow] = useState(false)
  // const [cart, sendCart] = useState(newCart);

  mobileMenuVisible ? disableBodyScroll(document) : enableBodyScroll(document)

  // always show the nav on mobile/tablet
  const visibilityStyle = `${visibleNavBar ? `block` : `hidden`}`

  const MobileMenuOpen = mobileMenuVisible ? "opacity-0" : ""

  const MobileMenuIcon = MenuIcon

  const MobileMenuBack = mobileMenuVisible
    ? "opacity-100"
    : "opacity-0 pointer-events-none"

  // Fetching query data
  const data = useStaticQuery(graphql`
    query {
      allCraftCategoryInterface {
        nodes {
          ... on Craft_productCategories_Category {
            id
            title
            slug
            uri
            url
          }
        }
      }
      craftTopiconGlobalSet {
        heroImage {
          ... on Craft_heroImage_heroImage_BlockType {
            image {
              ... on Craft_uploads_Asset {
                url
              }
            }
          }
        }
      }
      craftLogoGlobalSet {
        heroImage {
          ... on Craft_heroImage_heroImage_BlockType {
            id
            image {
              ... on Craft_uploads_Asset {
                id
                url
              }
            }
          }
        }
      }
    }
  `)

  const category = data.allCraftCategoryInterface.nodes
  const topicon = data.craftTopiconGlobalSet.heroImage[0].image[0].url
  const logo = data.craftLogoGlobalSet.heroImage[0].image[0].url

  console.log(category);

  return (
    <>
      <div className="top-strip duration-300 ease-in-out z-20 fixed w-full py-2 bg-white hidden md:flex">
        <span>
          <img src={topicon} alt="" />
        </span>
        <p className="pt-1">Complimentary worldwide shipping</p>
      </div>
      <div
        id="navbar"
        className={`${visibilityStyle} transition duration-300 ease font-display bg-secondary text-primary transition-opacity duration-300 ease-in-out uppercase z-20 fixed w-full py-4 lg:text-2xl md:text-sm text-xs md:top-11`}
      >
        {/*<div className={`w-full h-full fixed top-0 -z-1 transition duration-300 ease ${MobileMenuBack}`}></div>*/}
        <div className="container lg:max-w-screen-2xl-new mx-auto px-6">
          <div className={`flex items-center justify-between`}>
            <div className="w-4/12 lg:hidden block">
              <MobileMenuIcon
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                className="w-8 h-8 cursor-pointer"
              />
            </div>
            <div className="w-4/12 lg:w-2/12 lg:text-left text-center text-sm">
              <TransitionLink to="/">
                <img className="logo" src={logo} alt="" />
              </TransitionLink>
            </div>
            <div className="w-8/12 text-center mx-auto lg:block hidden">
              <div
                style={{ marginTop: `3px`, marginBottom: `-3px` }}
                className="w-8/12 text-center mx-auto lg:block hidden"
              >
                <ul className="navbar-items">
                  <li className="dropdown">
                    <span className="dropbtn lg:mr-8 mr-2">Shop </span>
                    <div className="dropdown-content">
                      {category.map((product, index) => 
                      {console.log(product.slug); return(
                        <Link to={`/categories/${product.slug?.replace('/', '')}`} key={index}>
                          {product.title}
                        </Link>
                      )}
                      )}
                      <hr />
                      <a href={`/shop`}>All Products</a>
                    </div>
                  </li>

                  <li>
                    <TransitionLinkFade to="/about-us" className="lg:mr-8 mr-2">
                      About
                    </TransitionLinkFade>
                  </li>

                  <li>
                    <TransitionLinkFade to="/stories" className="lg:mr-8 mr-2">
                      Stories
                    </TransitionLinkFade>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-4/12 lg:w-2/12 flex justify-end">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onChange={handleCurrencyChange}
              />
              <button
                className="inline-block relative"
                onClick={() => {
                  setShow(!show)
                }}
              >
                {(() => {
                  return (
                    <div className="cart-bag-qt flex justify-center items-center bg-red-600 rounded-full absolute bottom-0.3 w-15 h-15">
                      <span className="text-sm leading-inherit">{count}</span>
                    </div>
                  )
                })()}
                <ShoppingBagIcon className="lg:w-7 lg:h-7 w-6 h-6 ml-auto" />
              </button>
              {show && <Cart items={siteCart} />}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <Transition
        in={mobileMenuVisible}
        timeout={300}
        onEnter={node => {
          gsap.timeline().to(node, { marginLeft: "0px", duration: 0.3 })
        }}
        onExit={node => {
          gsap.timeline().to(node, { marginLeft: "-300px", duration: 0.3 })
        }}
        unmountOnExit
      >
        <MobileMenu logo={logo} MobileMenuIcon={MobileMenuIcon} category={category} />
      </Transition>
      <MobileBackground
        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
      />
    </>
  )
}

const MobileMenu = ({ category,logo }) => {
  const { mobileMenuVisible, setMobileMenuVisible } = useContext(myContext)
  const MobileMenuIcon = CloseIcon

  return (
    <div className="transition duration-300 ease h-full -ml-300 bottom-0 fixed w-300 text-white lg:hidden toggle-menu-mob">
      <div className="w-300 bg-black flex flex-col justify-between h-full z-40 px-3 py-5">
        <div className="flex justify-between items-center pb-10">
          <div className="w-4/12 lg:w-2/12 text-lg uppercase">
          
              <TransitionLink to="/">
                <img className="logo" src={logo} alt="" />
              </TransitionLink>
           
          </div>
          <div className="lg:hidden block">
            <MobileMenuIcon
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              className={`w-6 h-6 cursor-pointer`}
            />
          </div>
        </div>

       <div className="scroll-item">  
        <div className="flex flex-wrap text-3xl space-y-8">
          <div className="w-full">
            <TransitionLink to="/about-us" className="lg:mr-8 mr-2 text-2xl uppercase">
              About
            </TransitionLink>
          </div>
          <div className="w-full">
            <TransitionLink to="/stories" className="text-2xl	uppercase">
              Stories
            </TransitionLink>
          </div>
          {/* Display the category dropdown for Shop */}
          <div className="w-full">
            <div className="relative inline-block text-left w-full">
              <button
                type="button"
                className="w-full inline-flex justify-between items-center text-2xl uppercase"
                id="shop-menu"
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              >
                Shop
                {/* <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg> */}
              </button>
              {/* Dropdown panel */}
              {mobileMenuVisible && (
                <div
                  className="origin-top-right w-full right-0 mt-2 w-40 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="shop-menu"
                >
                  <div className="py-1" role="none">
                    {category.map((product, index) => (
                      <TransitionLink
                        to={`/categories/${product.slug}`}
                        key={index}
                        onClick={() => setMobileMenuVisible(false)}
                        className="block px-4 py-2 text-sm text-white"
                        role="menuitem"
                      >
                        {'>'} {product.title}
                      </TransitionLink>
                    ))}
                    <TransitionLink
                      to={`/shop`}
                      onClick={() => setMobileMenuVisible(false)}
                      className="block px-4 py-2 text-sm text-white"
                      role="menuitem"
                    >
                      {'>'} All Products
                    </TransitionLink>
                  </div>
                </div>
              )}
              {/* End of dropdown panel */}
            </div>
          </div>
          {/* End of category dropdown */}
        </div>
        <div className="text-lg uppercase pt-10">
          <a
            href="https://www.instagram.com/protoproto.studio"
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </div>
       </div>

      </div>
    </div>
  )
}


const MobileBackground = () => {
  const { mobileMenuVisible, setMobileMenuVisible } = useContext(myContext)

  const MobileMenuBack = mobileMenuVisible
    ? "opacity-100"
    : "opacity-0 pointer-events-none"

  return (
    <div
      onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
      className={`w-full h-full fixed bg-blackOpacity top-0 z-50 transition duration-300 ease ${MobileMenuBack}`}
    ></div>
  )
}
export default NavBar
