import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import LeftArrow from "../../assets/Left.svg";
import RightArrow from "../../assets/Right.svg";
import PropTypes from "prop-types";

const ImageSlideshow = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  if (!product) return null;

  const { price, promotionalPrice, imageUrls } = product;

  const images = imageUrls.map((url, index) => ({
    src: url,
    alt: `Slide ${index + 1}`,
  }));

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    swiperRef.current?.slideToLoop(index);
  };

  const discountPercentage = Math.round(
    ((price - promotionalPrice) / price) * 100
  );

  return (
    <div className="relative w-full  text-center mx-auto">
      {/* Discount label */}
      {promotionalPrice < price && discountPercentage > 0 && (
        <div className="absolute top-4 md:top-8 right-0 h-[40px] md:h-[57px] w-[80px] md:w-[102.53px] bg-red-600 text-white px-3 md:px-4 py-2 md:py-3 text-xl md:text-2xl z-10">
          -{discountPercentage}%
        </div>
      )}

      {/* Main Swiper */}
      <div className="">
        <Swiper
          className="w-full h-full"
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{
            prevEl: ".prev-arrow",
            nextEl: ".next-arrow",
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation Arrows */}
      <button
        className="prev-arrow absolute left-2 md:left-2.5 top-1/2 transform -translate-y-1/2 border-none p-2 md:p-2.5 cursor-pointer z-10"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
      >
        <img src={LeftArrow} alt="Previous" className="w-8 md:w-auto" />
      </button>
      <button
        className="next-arrow absolute right-2 md:right-2.5 top-1/2 transform -translate-y-1/2 border-none p-2 md:p-2.5 cursor-pointer z-10"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
      >
        <img src={RightArrow} alt="Next" className="w-8 md:w-auto" />
      </button>

      {/* Thumbnail Gallery */}
      <div className="mt-2 sm:mt-3 md:mt-5 
        flex justify-center gap-2 
        overflow-x-auto px-4 sm:px-0
        max-w-full sm:max-w-[600px] md:max-w-[780px]
        mx-auto
        scrollbar-hide">
        {images
          .filter((_, index) => index !== activeIndex)
          .map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-[100px] h-[112px] 
                sm:w-[120px] sm:h-[135px]
                md:w-[144px] md:h-[162px]
                object-cover cursor-pointer 
                flex-shrink-0 
                hover:opacity-90 
                transition-all duration-200
                border border-transparent
                hover:border-gray-200"
              onClick={() =>
                handleThumbnailClick(
                  images.findIndex((img) => img.src === image.src)
                )
              }
            />
          ))}
      </div>
    </div>
  );
};

ImageSlideshow.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number.isRequired,
    promotionalPrice: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ImageSlideshow;
