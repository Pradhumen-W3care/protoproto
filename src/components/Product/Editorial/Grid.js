import React from "react"

const ProductEditorialGrid = ({ children }) => (
  <div className="container mx-auto overflow-hidden xl:my-32 lg:my-24 md:my-20 my-16">
    <div className="md:px-0 px-6">
      <div className="flex">
        <div className="xl:w-1/2 md:w-2/3 w-full mx-auto text-center">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default ProductEditorialGrid
