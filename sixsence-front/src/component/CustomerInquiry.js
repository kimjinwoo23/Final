// src/component/CustomerInquiry.js

import React from 'react';
import '../css/CustomerInquiry.css';

const CustomerInquiry = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">1:1 문의</h2>
      <form className="form-horizontal">
        <div className="form-group row">
          <label htmlFor="inquiryType" className="col-sm-2 col-form-label">문의유형</label>
          <div className="col-sm-10">
            <select className="form-control" id="inquiryType">
              <option value="general">일반 문의</option>
              <option value="technical">기술 문의</option>
              <option value="billing">결제 문의</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userName" className="col-sm-2 col-form-label">이름</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="userName" placeholder="이름을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userPhone" className="col-sm-2 col-form-label">연락처</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="userPhone" placeholder="연락처를 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userEmail" className="col-sm-2 col-form-label">이메일</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="userEmail" placeholder="이메일을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inquiryTitle" className="col-sm-2 col-form-label">제목</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inquiryTitle" placeholder="제목을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inquiryContent" className="col-sm-2 col-form-label">내용</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="inquiryContent" rows="4" placeholder="내용을 입력하세요"></textarea>
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
