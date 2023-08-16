import { myContext } from "../context/provider"
import React, { useContext, useMemo } from "react"
import useHasMounted from "../hooks/useHasMounted"

import withTransitionPortal from "@components/withTransitionPortal"

const PageElement = ({ element }) => {
  const { siteLoaded, pageTransitioning, transitionPortalState } =
    useContext(myContext)

  const hasMounted = useHasMounted()

  const { duration, visible, onComplete, preloader, promise } =
    transitionPortalState

  // Create a memoized preloader wrapped in a transition portal
  const PageTransitionPreloader = useMemo(
    () => withTransitionPortal(preloader),
    [preloader]
  )

  return (
    <>
      {element}
      {/* Render the portal when the site is loading or a page is transitioning */}
      {(!siteLoaded || pageTransitioning) && hasMounted && (
        <PageTransitionPreloader
          duration={duration}
          promise={promise}
          visible={visible}
          onComplete={onComplete}
        />
      )}
    </>
  )
}

export default PageElement
