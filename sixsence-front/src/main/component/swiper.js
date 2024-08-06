import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import '../css/swiper.css';





function ImageSlider() {
  return (
    <div className="slider-container">
      <Swiper
        className="image-slider"
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 300 }} // 슬라이드 자동 재생 시간 설정
        loop
      >
        <SwiperSlide>
          <img src="https://cf2.lottecinema.co.kr/lotte_image/2024/RebelintheRye/RebelintheRye_1920774.png" alt="Slide 1" className="slide-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cf2.lottecinema.co.kr/lotte_image/2024/Pilot/Pilot_192077499.jpg" alt="Slide 2" className="slide-image1" />
        </SwiperSlide>
     
      </Swiper>
    </div>
  );
}

export default ImageSlider;