import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomerBoard from "./CustomerBoard";
import "../css/NoticeView.css";

const NoticeView = () => {
  const { postNo } = useParams(); 
  const [post, setPost] = useState(null); // 게시글 데이터를 저장할 상태 변수

  useEffect(() => {
    axios.get(`api/board/${postNo}`)
    .then(response => {
      console.log(response);
      setPost(response.data);
    })
    .catch(error => {
      console.log("Error",error);
    });
  },[postNo]);
 
  if (!post) {
    return <div>Loading...<img src="/image.jpg"/></div>;
  }

 return(
  <div className="container mt-4">
  <h2>{post.postTitle}</h2>
      <p>{post.postContent}</p>
      <p><strong>작성일:</strong> {post.postCreateDate}</p>
      <p><strong>조회수:</strong> {post.postCount}</p>
    </div>
  );
};

export default NoticeView;
