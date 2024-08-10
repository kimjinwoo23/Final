import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/NoticeView.css";

const NoticeView = () => {
  const { postNo } = useParams(); 
  const [post, setPost] = useState(null); // 게시글 데이터를 저장할 상태 변수
  const navigate = useNavigate('');
  const navihandle = () => {
     navigate("/CustomerBoard");
  }

 useEffect(() => {
  axios.get(`/api/board/${postNo}`)
  .then(response => {
    console.log(response);
    setPost(response.data);
  })
  .catch(error => {
    console.lot("Error",error);
  });
 },[postNo]);

 if(!post) {
  return <div>Loading...<img src="/board_image/b_image.jpg"/></div>
 }

 return(
  <div className="container mt-4">
    <h2>{post.postTitle}</h2>
    <p>{post.postContent}</p>
    <p><strong>작성일:</strong>{post.postCreateDate}</p>
    <p><strong>조회수 :</strong>{post.postCount}</p>
    <button size="large" onClick={navihandle} >돌아가기</button>
  </div>
 );
};

export default NoticeView;
