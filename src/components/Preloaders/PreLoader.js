import React, { useEffect, useRef, useState } from "react"

import preloaderABA from "./logo_animation_A-B-A_Gif_01.mp4"
import preloaderBCB from "./logo_animation_B-C-B_GIF_01.mp4"
import preloaderCDC from "./logo_animation_C-D-C_GIF_01.mp4"
import preloaderDED from "./logo_animation_D-E-D_GIF_01.mp4"
import preloaderEFE from "./logo_animation_E-F-E_GIF_01.mp4"
import preloaderFGF from "./logo_animation_F-G-F_GIF_01.mp4"
import preloaderGHG from "./logo_animation_G-H-G_GIF_01.mp4"
import preloaderHIH from "./logo_animation_H-I-H_GIF_01.mp4"

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0
}

const getRandPreloader = () => {
  const preLoaderVideos = [
    preloaderABA,
    preloaderBCB,
    preloaderCDC,
    preloaderDED,
    preloaderEFE,
    preloaderFGF,
    preloaderGHG,
    preloaderHIH,
  ]
  return preLoaderVideos[Math.floor(Math.random() * preLoaderVideos.length)]
}

/**
 * PreLoader Video
 *
 * @param {Function} onLoad Calback that runs when the preloader video is playing
 * @param {Object} props
 */
const PreLoader = ({ onLoad = () => {}, ...props }) => {
  const videoParentRef = useRef()

  const [preLoaderSrc] = useState(getRandPreloader())
  const [shouldUseImage, setShouldUseImage] = useState(false)

  // Trigger the onLoad event when a video is playing
  useEffect(() => {
    if (shouldUseImage) return
    const video = videoParentRef.current.children.item(0)
    video.onplaying = onLoad
  }, [onLoad, shouldUseImage, videoParentRef])

  // Write an autoplaying video element to the DOM
  // Falls back to an image for Safari
  // @see https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5
  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0]

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false
        player.playsinline = true
        player.muted = true
        player.setAttribute("muted", "") // leave no stones unturned :)
        player.autoplay = true

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play()
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none"
                setShouldUseImage(true)
              })
          }
        }, 0)
      }
    }
  }, [])

  return shouldUseImage ? (
    <img onLoad={onLoad} src={preLoaderSrc} alt="Muted Video" />
  ) : (
    <div
      className="lg:w-1/2"
      ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
        >
        <source src="${preLoaderSrc}" type="video/mp4" />
        </video>`,
      }}
    />
  )
}

export default PreLoader
