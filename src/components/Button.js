import React from "react"

const Button = ({ children, className, onClick = () => {}, ...props }) => {
  return (
    <button
      className={`bg-black text-white text-center w-full text-lg py-4 leading-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
