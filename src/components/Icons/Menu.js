import React from "react"

// menu from https://heroicons.dev
const Menu = ({ className = "w-6 h-6", onClick = () => {} }) => (
  <svg
    onClick={onClick}
    className={`${className} fill-current`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 23 17"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0.634766" y1="0.963281" x2="22.2426" y2="0.963281" stroke="currentColor" strokeWidth="1.8"/>
    <line x1="0.634766" y1="8.28652" x2="22.2426" y2="8.28652" stroke="currentColor" strokeWidth="1.8"/>
    <line x1="0.634766" y1="15.5492" x2="22.2426" y2="15.5492" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
)

export default Menu
