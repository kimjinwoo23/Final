import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import '../css/Home.css'; // 추가적인 스타일링을 위해 CSS 파일 임포트
import { Swiper, SwiperSlide } from 'swiper/react';


Modal.setAppElement('#root');

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className='container'>
      <Swiper
        className="banner"
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }} // 슬라이드 자동 재생 시간 설정
      >
        <SwiperSlide>
          <div className="slide-content">
            <img src="https://cf2.lottecinema.co.kr/lotte_image/2024/Pilot/Pilot_192077499.jpg" alt="Slide 1" className="slide-image" />
            <button className="modal-button" onClick={() => setModalIsOpen(true)}>Watch Video</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img src="path/to/your/image2.jpg" alt="Slide 2" className="slide-image" />
            <button className="modal-button" onClick={() => setModalIsOpen(true)}>Watch Video</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img src="path/to/your/image3.jpg" alt="Slide 3" className="slide-image" />
            <button className="modal-button" onClick={() => setModalIsOpen(true)}>Watch Video</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img src="path/to/your/image4.jpg" alt="Slide 4" className="slide-image" />
            <button className="modal-button" onClick={() => setModalIsOpen(true)}>Watch Video</button>
          </div>
        </SwiperSlide>
      </Swiper>

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