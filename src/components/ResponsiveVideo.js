import React from "react"

const ResponsiveVideo = ({ src, title }) => (
  <div className="relative aspect-w-1 aspect-h-1">
    <iframe
      title={title}
      className="absolute inset-0 h-full w-full"
      src={src}
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>
  </div>
)

export default ResponsiveVideo
