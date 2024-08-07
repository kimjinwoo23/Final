import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../css/Home.css'; // 추가적인 스타일링을 위해 CSS 파일 임포트

Modal.setAppElement('#root');

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  

  return (
    <div>
      <div className="slider-container">
        <Swiper
        
          modules={[Navigation, Pagination, Autoplay]}
          
          spaceBetween={100}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }} // 슬라이드 자동 재생 시간 설정
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          loop
        >
          <SwiperSlide><img src='/img/exit.jpg'></img></SwiperSlide>
          <SwiperSlide><img src='/img/lol.jpg'></img></SwiperSlide>
          <SwiperSlide><img src='/img/furyroa.jpg' ></img></SwiperSlide>
          <SwiperSlide><img src='/img/deadpool.jpg'></img></SwiperSlide>
          <SwiperSlide><img src='/img/super.jpg'></img></SwiperSlide>
        </Swiper>
      </div>

     
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            content: {
              position: 'relative',
              width: '80%',
              maxWidth: '800px',
              height: 'auto',
              maxHeight: '90vh',
              margin: '0 auto',
              borderRadius: '8px',
              padding: '0',
              overflow: 'hidden',
            }
          }}
        >
          <div className="video-background-container">
            <ReactPlayer
              url='https://youtu.be/NVDLUJa5dac?si=poOn1qun1Y1MWP-t'
              playing
              loop
              muted
              width='100%'
              height='100%'
              className='video-background'
            />
          </div>
          <div className="close-button-container">
            <button className="close-button" onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </Modal>
      </div>

    
  );
}

export default Home;