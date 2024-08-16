import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/NoticeWrite.css';

const NoticeWrite = () => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const navigate = useNavigate();

   const resistration = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
      writeCompleted();
   }

   const writeCompleted = () => {
      const writeCompletedData = {
         postTitle: title,
         postContent: content,
         postCount: 0, // 조회수 초기값 설정
         postCreateDate: new Date() // 작성일자 설정
      };

      axios.post("/api/writeCompleted", writeCompletedData)
      .then(response => {
         alert("글쓰기가 정상적으로 등록되었습니다.");
         setTitle(''); // 제목 초기화
         setContent(''); // 내용 초기화
         navigate('/customerBoard'); // 글쓰기 완료 후 페이지 이동
      })
      .catch(err => {
         alert("등록이 안되었습니다.");
      });
   };

   return (
      <div className="container mt-4">
         <h2 className='text-center mb-4'>공지사항 글쓰기</h2>
         <form onSubmit={resistration}>
            <div className='form-group'>
               <label htmlFor='title'>제목</label>
               <input type='text' className='form-control'
                  id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                  required />
            </div>
            <div className='form-group'>
               <label htmlFor='content'>내용</label>
               <textarea className='form-control'
                  id="content" value={content} onChange={(e) => setContent(e.target.value)}
                  required></textarea>
            </div>
            <button type="submit" className="bba12">글쓰기완료</button>
         </form>
      </div>
   );
};

export default NoticeWrite;
