import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import SwiperCore, { Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

import useSwiperRef from "@hooks/useSwiperRef"

import {
  NarrowRightArrow as NarrowRightArrowIcon,
  NarrowLeftArrow as NarrowLeftArrowIcon,
} from "@components/Icons"

const ProductGallerySwiper = ({
  images,
  type = "fraction",
  navigation = true,
}) => {
  const [nextEl, nextElRef] = useSwiperRef()
  const [prevEl, prevElRef] = useSwiperRef()
  const [paginationEl, paginationRef] = useSwiperRef()

  SwiperCore.use([Pagination, Navigation])

  return (
    <>
      <Swiper
        pagination={{
          el: paginationEl,
          type,
        }}
        navigation={
          navigation && {
            prevEl,
            nextEl,
          }
        }
        slidesPerView={1}
      >
        {images
          .filter(n => n)
          .map((image, i) => (
            <SwiperSlide className="flex justify-center lg:block" key={i}>
              <GatsbyImage
                image={image?.localFile?.childImageSharp?.gatsbyImageData}
                imgStyle={{ objectFit: "contain", width: "100%" }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex mt-4 text-xl">
        {navigation && (
          <div className="flex-auto" ref={prevElRef}>
            <NarrowLeftArrowIcon className="w-8 h-8 cursor-pointer" />
          </div>
        )}
        <div
          className={`flex-auto text-center ${
            type === "bullets" ? `space-x-4` : ``
          }`}
          ref={paginationRef}
        ></div>
        {navigation && (
          <div className="flex-auto text-right" ref={nextElRef}>
            <NarrowRightArrowIcon className="w-8 h-8 cursor-pointer" />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductGallerySwiper
