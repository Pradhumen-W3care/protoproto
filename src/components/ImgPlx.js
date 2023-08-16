import React, { createRef, useEffect, useState } from "react"
import Plx from "react-plx"

const KiberaPlx = ({
  children,
  startValue = 0,
  endValue = 300,
  duration = 1000,
  property = `translateY`,
  className = ``,
}) => {
  const ref = createRef()
  const [height, setHeight] = useState(0)
  const innerHeight = typeof window === "undefined" ? 0 : window.innerHeight

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [ref, setHeight])

  const parallaxData = [
    {
      start: "self",
      end: "self",
      endOffset: innerHeight + height * 2, // Leave enough space for the image to fully transition with negative translate Y
      duration,
      properties: [
        {
          startValue,
          endValue,
          property,
        },
      ],
    },
  ]

  return (
    <div ref={ref} className={`absolute z-10 w-full ${className}`}>
      <Plx parallaxData={parallaxData}>{children}</Plx>
    </div>
  )
}

export default KiberaPlx
