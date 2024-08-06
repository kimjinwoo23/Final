import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/NoticeWrite.css';

const NoticeWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotice = {
      post_title: title,
      post_content: content,
      post_count: 0,
      post_createDate: new Date(),
    };

    try {
      // 실제 데이터베이스에 저장하는 코드
      await axios.post("/api/board", newNotice);
      navigate("/customerBoard");
    } catch (error) {
      console.error("There was an error saving the notice!", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">공지사항 글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">글쓰기 완료</button>
      </form>
    </div>
  );
};
  export default NoticeWrite;










