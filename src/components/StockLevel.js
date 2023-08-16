import React from "react"

const StockLevel = ({ stock = 0 }) => (
  <div>
    Edition of <span className="stock-level">{stock}</span> only
  </div>
)

export default StockLevel
