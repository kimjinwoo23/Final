import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/CustomerInquiry.css';

const CustomerInquiry = () => {
  const [member, setMember] = useState({ name: '', phone: '', email: '' });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [inquiryType, setInquiryType] = useState('general');
  
  const navigate = useNavigate('');

  useEffect(() => {
    axios.get("/api/getMember")
      .then(response => {
        setMember({
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email,
        });
      })
      .catch(error => {
        console.log("Error", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지

    const inquiryData = {
      memberNo: member.no, // 회원번호
      oboTitle: title, // 문의 제목
      memberEmail: member.email, // 회원 이메일
      oboContent: content, // 문의 내용
      oboCreateDate: new Date(), // 생성 날짜
    };

    axios.post("/api/submitInquiry", inquiryData)
      .then(response => {
        alert("문의가 성공적으로 제출되었습니다.");
        navigate("/MypageObo");
      })
      .catch(error => {
        alert("문의 제출에 실패했습니다.");
        console.log("Error", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">1:1 문의</h2>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inquiryType" className="col-sm-2 col-form-label">문의유형</label>
          <div className="col-sm-10">
            <select className="form-control" id="inquiryType" value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}>
              <option value="general">일반 문의</option>
              <option value="technical">기술 문의</option>
              <option value="billing">결제 문의</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userName" className="col-sm-2 col-form-label">이름</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="userName" value={member.name} readOnly />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userPhone" className="col-sm-2 col-form-label">연락처</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="userPhone" value={member.phone} readOnly />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userEmail" className="col-sm-2 col-form-label">이메일</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="userEmail" value={member.email} readOnly />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inquiryTitle" className="col-sm-2 col-form-label">제목</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inquiryTitle" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inquiryContent" className="col-sm-2 col-form-label">내용</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="inquiryContent" rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요"></textarea>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">제출</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerInquiry;
