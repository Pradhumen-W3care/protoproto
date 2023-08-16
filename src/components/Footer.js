import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import MailChimpSignUpForm from "@components/MailChimpSignUpForm"
import TransitionLink from "@components/TransitionLink"



const Footer = () => {

  const data = useStaticQuery(graphql`
  query {
    craftFootericonGlobalSet {
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
  
  
  const paymentIcon = data.craftFootericonGlobalSet.heroImage[0].image[0].url


return(

  
  <footer className="md:pt-14 pt-12 mt-auto bg-white text-black font-display">
    <div className="container lg:max-w-screen-2xl-new mx-auto relative overflow-hidden">
      <div className="px-6">
        <div className="flex flex-wrap -mx-6 text-center">
          <div className="md:order-none order-2 md:w-1/4 w-full uppercase md:text-left px-6">
            <TransitionLink to={`/shop`} className="block mb-6">
              Shop
            </TransitionLink>
            <TransitionLink to={`/about-us`} className="block mb-6">
              About
            </TransitionLink>
            <TransitionLink to={`/stories`} className="block mb-6">
              Stories
            </TransitionLink>
          </div>
          <div className="md:order-none order-3 md:w-1/2 w-full uppercase md:text-center md:mb-0 mb-12 px-6">
            <a
              href="https://www.instagram.com/protoproto.studio"
              rel="noreferrer"
              target="_blank"
              className="block mb-6"
            >
              Instagram
            </a>
            <a className="block" href="mailto:hello@protoproto.studio">
              hello@protoproto.studio
            </a>
            <div class="flex justify-center mt-2 ">
              <img className="pay-img" src={paymentIcon} alt=""/>
            </div>
          </div>
          <div className="md:order-none order-1 md:w-1/4 w-full md:text-right md:mb-0 mb-12 px-6">
            <div className="mb-2">Sign up for updates!</div>
            <MailChimpSignUpForm />
          </div>
          <div className="md:order-none order-4 text-xs flex flex-wrap w-full text-center md:mt-6 px-6">
            <div className="md:text-left md:w-1/2 w-full md:order-none order-2 mb-4">
              Copyright Proto Proto {new Date().getFullYear()}
            </div>
            <div className="md:text-right md:w-1/2 w-full md:order-none order-1 mb-4">
              <TransitionLink to={`/terms-of-service`}>Terms</TransitionLink> -{" "}
              <TransitionLink to={`/privacy-policy`}>Privacy</TransitionLink>-{" "}
              <TransitionLink to={`/returns-policy`}>Returns</TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)
}
export default Footer
