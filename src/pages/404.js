import React from "react"
import TransitionLink from "@components/TransitionLink"

const NotFoundPage = () => (
  <div className="font-body">
    <div
      id="navbar"
      className={`transition-opacity duration-300 ease-in-out uppercase z-20 fixed w-full py-6 lg:text-2xl md:text-sm text-xs overflow-hidden`}
    >
      <div className="container mx-auto overflow-hidden px-8">
        <div className={`flex items-center`}>
          <div className="w-4/12 lg:w-2/12 lg:text-left text-center text-sm">
            <TransitionLink to="/">ProtoProto©</TransitionLink>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto overflow-hidden">
      <div className="md:px-0 px-6">
        <div className="flex flex-col items-center justify-center text-3xl space-y-8 h-screen text-center">
          <h1 className="text-7xl font-bold">404</h1>
          <p className="text-2xl">Sorry, we were unable to find that page</p>
          <div className="lg:w-1/4 xl:w-1/6">
            <TransitionLink
              to="/"
              className="bg-black text-white text-center w-full text-lg py-4 px-6 leading-none uppercase"
            >
              Back to ProtoProto
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NotFoundPage
