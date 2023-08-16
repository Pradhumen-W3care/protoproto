import React from "react"

// arrow-narrow-left from https://heroicons.dev
const NarrowLeftArrow = ({ className = "w-6 h-6" }) => (
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
      d="M7 16l-4-4m0 0l4-4m-4 4h18"
    ></path>
  </svg>
)

export default NarrowLeftArrow
