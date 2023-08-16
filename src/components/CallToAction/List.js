import React from "react"

const CallToActionList = ({ children }) => (
  <div className="container about-container-home mx-auto overflow-hidden p-0">
    <div className="flex flex-wrap">
      {children.map((child, i) => (
        <div key={i} className="md:w-1/2 w-full">
          {child}
        </div>
      ))}
    </div>
  </div>
)

export default CallToActionList
