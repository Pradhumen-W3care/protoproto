/**
 * Main Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Waypoint } from "react-waypoint"
import { TransitionState } from "gatsby-plugin-transition-link"
import { Helmet } from "react-helmet"
import parse from "html-react-parser"
import { motion } from "framer-motion"

import NavBar from "@components/NavBar"
import Footer from "@components/Footer"
import { myContext } from "../../context/provider"
import { useHasMounted } from "@hooks"

const MainLayout = ({
  children,
  header,
  theme = `light`,
  showNav = true,
  showFooter = true,
  seomatic = {},
}) => {
  const { setVisibleNavBar } = useContext(myContext)
  const hasMounted = useHasMounted()

  const MemoizedMotion = useMemo(
    () =>
      ({ children, transitionStatus, exit }) =>
        (
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              transitionStatus === "exiting" ? exit.state : { opacity: 1 }
            }
            transition={
              transitionStatus === "exiting"
                ? { duration: exit.length }
                : { duration: 0.3 }
            }
          >
            {children}
          </motion.div>
        ),
    []
  )

  // Show the navbar if the user is not at the top of the page
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollY > 0) {
      setVisibleNavBar(true)
    }
  }, [setVisibleNavBar, showNav])

  // https://gist.github.com/rjgux/1a7ec4993c8e0a18b51322c9a8c6eed9
  const splitJsonLdStringIntoArray = seomatic?.metaJsonLdContainer
    ? seomatic.metaJsonLdContainer
        .replace(/\<\/script\>/g, "")
        .split(`<script type="application/ld+json">`)
    : null

  return (
    <>
      <Helmet>
        {seomatic.metaTitleContainer && parse(seomatic.metaTitleContainer)}
        {seomatic.metaTagContainer && parse(seomatic.metaTagContainer)}
        {seomatic.metaLinkContainer && parse(seomatic.metaLinkContainer)}
        {splitJsonLdStringIntoArray &&
          splitJsonLdStringIntoArray.map((script, index) => (
            <script type="application/ld+json" key={`json-ld-${index}`}>
              {script}
            </script>
          ))}
      </Helmet>
      <TransitionState>
        {({ transitionStatus, entry, exit }) => {
          // Ensure the client has mounted before rendering transitions
          // I **think** this prevents conflicts with the SSR rendered DOM
          if (!hasMounted) return null
          return (
            <div className={`theme-${theme} bg-primary text-secondary`}>
              {transitionStatus !== "exiting" && (
                <Waypoint
                  onEnter={() => {
                    setVisibleNavBar(showNav)
                  }}
                  onLeave={() => {
                    setVisibleNavBar(true)
                  }}
                />
              )}
              <NavBar />
              {header && (
                <MemoizedMotion transitionStatus={transitionStatus} exit={exit}>
                  <header className={showNav ? `` : ``}>{header}</header>
                </MemoizedMotion>
              )}
              <div className="max-w-screen-2xl mx-auto min-h-desk flex flex-col">
                <main className="font-body">
                  <MemoizedMotion
                    transitionStatus={transitionStatus}
                    exit={exit}
                  >
                    {children}
                  </MemoizedMotion>
                </main>
              </div>
              {showFooter && <Footer />}
            </div>
          )
        }}
      </TransitionState>
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
