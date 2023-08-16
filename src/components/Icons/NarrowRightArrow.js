import React from "react"

// arrow-narrow-right from https://heroicons.dev
const NarrowRightArrow = ({ className = "w-6 h-6" }) => (
  <svg
    className={`${className} fill-current`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    ></path>
  </svg>
)

export default NarrowRightArrow
