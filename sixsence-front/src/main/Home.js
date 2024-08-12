import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../css/Home.css';

Modal.setAppElement('#root');

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  
  const openModalWithVideo = (url) => {
    setVideoUrl(url);
    setModalIsOpen(true);
  };

  return (
    <div className="app-container">
   
      <div className="slider-container">
        <Swiper 
        
          modules={[Navigation, Pagination, Autoplay]}
          
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }} // 슬라이드 자동 재생 시간 설정
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          loop
          preventClicks={false}  // 클릭 이벤트를 방지하지 않도록 설정
          preventClicksPropagation={false}  // 클릭 이벤트 전파 방지하지 않도록 설정
        >
          <div className='slide-slider'>
           <SwiperSlide className='slide slide1' style={{height: '1000px'}}>
            <div className='play1'>
              <button className='bootplay1' onClick={() => openModalWithVideo('https://youtu.be/amI9ujTxtH4?si=B9CtJDnyZGUF1Gys')}>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="100" height="100" fill="currentColor" 
              class="bi bi-play" viewBox="0 0 16 16" >
              
  <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
</svg>
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className='slide slide2' style={{height: '1000px'}}>
            <div className='play2'>
              <button className='bootplay2' onClick={() => openModalWithVideo('https://youtu.be/tRNv-NrjzkQ?si=fM83t59wxFsgt93P')}>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="100" height="100" fill="currentColor" 
              class="bi bi-play" viewBox="0 0 16 16">
              
  <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
</svg>
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className='slide slide3' style={{height: '1000px'}}>
            <div className='play3'>
              <button className='bootplay3' onClick={() => openModalWithVideo('https://youtu.be/NVDLUJa5dac?si=U4Vvv9EGDNd5_3NA&t=90')}>
              <svg xmlns="http://www.w3.org/2000/svg"
               width="100" height="100" fill="currentColor" 
               class="bi bi-play"  viewBox="0 0 16 16">
              
  <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
</svg>
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className='slide slide4' style={{height: '1000px'}}>
            <div className='play4'>
              <button className='bootplay4' onClick={() => openModalWithVideo('https://youtu.be/-rlkJCk58SY?si=vWnS4vu2e-3uH-Es')}>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="100" height="100" fill="currentColor" 
              class="bi bi-play" viewBox="0 0 16 16">
              
  <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
</svg>
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className='slide slide5' style={{height: '1000px'}}>
            <div className='play5'>
              <button className='bootplay5' onClick={() => openModalWithVideo('https://youtu.be/g1NL-Px92k4?si=gPSdUnZpXbnMt1zg&t=60')}>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="100" height="100" fill="currentColor" 
              class="bi bi-play" viewBox="0 0 16 16">
  <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
</svg>
              </button>
            </div>
          </SwiperSlide>
          </div>
        </Swiper>
        
      </div>


     
       <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            
            zIndex: 500,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            zIndex: 501, // z-index 추가
            position: 'relative',
            width: '60%',
            height: 'auto',
            margin: '0 auto',
            borderRadius: '8px',
            padding: '0',
            overflow: 'hidden',
          }
        }}
      >
        <div className="video-background-container">
          <ReactPlayer
          
            url={videoUrl}
            playing={true}
            loop
            controls={true}
            muted
            width="100%"
            height="1000px"
            
              className="react-player"
          />
        </div>
        <div className="modal-button-container">
          <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
      <div class="movies-container">
  
      <div class="movie-gallery">
    <div class="movie-poster-container">
        <img src='/img/a.jpg' alt="movie1" class="movie-poster" />
        <div class="movie-info">
            <h3>파일럿</h3>
            <p>100원</p>
        </div>
        <div class="infomation">
            <a href="/movie1/details" class="info_button">상세보기</a>
            <a href="/movie1/booking" class="booking-button">예매하기</a>
        </div>
    </div>

    <div class="movie-poster-container">
        <img src='/img/b.jpg' alt="movie2" class="movie-poster" />
        <div class="movie-info">
            <h3>탈주</h3>
            <p>100원</p>
        </div>
        <div class="infomation">
            <a href="/movie2/details" class="info_button">상세보기</a>
            <a href="/movie2/booking" class="booking-button">예매하기</a>
        </div>
    </div>

    <div class="movie-poster-container">
        <img src='/img/c.jpg' alt="movie3" class="movie-poster" />
        <div class="movie-info">
            <h3>데드풀과울버린</h3>
            <p>100원</p>
        </div>
        <div class="infomation">
            <a href="/movie3/details" class="info_button">상세보기</a>
            <a href="/movie3/booking" class="booking-button">예매하기</a>
        </div>
    </div>

    <div class="movie-poster-container">
        <img src='/img/d.jpg' alt="movie4" class="movie-poster" />
        <div class="movie-info">
            <h3>퓨리오사</h3>
            <p>100원</p>
        </div>
        <div class="infomation">
            <a href="/movie4/details" class="info_button">상세보기</a>
            <a href="/movie4/booking" class="booking-button">예매하기</a>
        </div>
    </div>

    <div class="movie-poster-container">
        <img src='/img/e.jpg' alt="movie5" class="movie-poster" />
        <div class="movie-info">
            <h3>슈퍼배드 4</h3>
            <p>100원</p>
        </div>
        <div class="infomation">
            <a href="/movie5/details" class="info_button">상세보기</a>
            <a href="/movie5/booking" class="booking-button">예매하기</a>
        </div>
    </div>
</div>

</div>
    </div>
    
  );
}

export default Home;