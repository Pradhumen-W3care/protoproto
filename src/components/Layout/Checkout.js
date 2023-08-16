/**
 * Checkout Layout component
 */

import React from "react"
import Layout from "@components/Layout"

const Checkout = ({ title, children, sidebar, showNav = false }) => {
  console.log(sidebar);
  return (
    <Layout showFooter={false} showNav={showNav}>
      <div className="container mx-auto pt-16" style={{"margin-top":"44px"}}>
        <div className="px-6">
          <div className="block lg:hidden">
            <h1 className="text-xl mb-4 pt-8 pb-4 lg:pt-28 lg:pb-12 lg:px-10">
              {title}
            </h1>
            <hr />
          </div>
          <div className="flex flex-col md:flex-row mb-8">
            <div className="order-2 md:order-1 w-full md:w-2/3 bg-white rounded-l md:pr-5 xl:pr-0">
              <h1 className="hidden lg:block lg:text-3xl font-normal py-4 border-b border-solid border-grey-light lg:pt-28 lg:pb-12 lg:px-10">
                {title}
              </h1>
              {/* children Slot */}
              {children}
            </div>
            {sidebar && (
              <div className="order-1 md:order-2 w-full md:w-1/3 bg-coolGray-100 rounded-r">
                <div className="px-5 py-7 lg:p-10">{sidebar}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Checkout
