import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import '../css/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function ImageSlider() {
  return (
    <div className="slider-container">
      <Swiper
      modules={[Navigation, Pagination, Autoplay]}
        className="image-slider"
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }} // 슬라이드 자동 재생 시간 설정
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        loop
        
      >
       
    
      <SwiperSlide><img src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88437/88437_320.jpg'></img></SwiperSlide>
      <SwiperSlide><img src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88228/88228_320.jpg'></img></SwiperSlide>
      <SwiperSlide><img src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88389/88389_320.jpg'></img></SwiperSlide>
      <SwiperSlide><img src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88390/88390_320.jpg'></img></SwiperSlide>
     <SwiperSlide><img src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88267/88267_320.jpg'></img></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSlider;