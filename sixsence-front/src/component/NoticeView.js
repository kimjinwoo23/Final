import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/NoticeView.css";

const NoticeView = () => {
  const { postNo } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`api/board/${postNo}`);
        setNotice(response.data);
      } catch (error) {
        console.error("에러입니다", error);
      }
    };
    fetchNotice();
  }, [postNo]);

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{notice.post_title}</h2>
      <div className="notice-content">
        <p>{notice.post_content}</p>
      </div>
      <div className="notice-meta">
        <span>작성일: {notice.post_createDate}</span>
        <spann>조회수: {notice.post_content}</spann>
      </div>
    </div>
  );
};

export default NoticeView;
