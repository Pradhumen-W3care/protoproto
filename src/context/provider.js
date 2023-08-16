import React, { useState } from "react"
import useRandomPreloader from "../components/Preloaders/useRandomPreloader"
import { Api } from "@utilities"

export const myContext = React.createContext()



const Provider = props =>  {
  const [siteCart, setSiteCart] = useState(false)
  const [siteLoaded, setSiteLoaded] = useState(false)
  const [visibleNavBar, setVisibleNavBar] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [pageTransitioning, setPageTransitioning] = useState(false)

  const [currencys, setCurrencys] = useState(typeof sessionStorage !== 'undefined' && sessionStorage?.getItem('selectedCurrency') || 'USD');

  // Default state that is used by the initial site load preloader
  const [transitionPortalState, setTransitionPortalState] = useState({
    pages: null,
    preloader: useRandomPreloader(),
    duration: 3,
    promise: null,
    visible: true,
    onComplete: () => setSiteLoaded(true),
  })

  return (
    <myContext.Provider
      value={{
        siteCart,
        setSiteCart: state => setSiteCart(state),
        visibleNavBar,
        setVisibleNavBar: val => setVisibleNavBar(!!val),
        mobileMenuVisible,
        setMobileMenuVisible: val => setMobileMenuVisible(!!val),
        siteLoaded,
        setSiteLoaded: val => setSiteLoaded(!!val),
        pageTransitioning,
        setPageTransitioning: val => setPageTransitioning(!!val),
        transitionPortalState,
        setTransitionPortalState: state => setTransitionPortalState(state),
        currencys, setCurrencys,
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ element }) => <Provider>{element}</Provider>
