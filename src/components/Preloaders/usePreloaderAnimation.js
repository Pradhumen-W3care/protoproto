import { useLottie, useLottieInteractivity } from "lottie-react"

const usePreloaderAnimation = animationData => {
  const options = {
    animationData,
    loop: true,
    autoplay: false,
    class: 'preloader-hidden hidden',
    onLoadedImages: () => {
      document.querySelector('.preloader-hidden').classList.remove('hidden')
      lottieObj.play()
    },
  }

  const lottieObj = useLottie(options)
  const Animation = useLottieInteractivity({ lottieObj })

  return Animation
}

export default usePreloaderAnimation
