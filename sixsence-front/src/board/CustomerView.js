// src/component/CustomerView.js

import React from 'react';
import '../css/CustomerView.css';
import NavBar from './NavBar';

const CustomerView = () => {
  return (
    <div className="container mt-4">
      <NavBar/>
      <h2 className="text-center mb-4">단체관람 및 개관 문의</h2>
      <form className="form-horizontal">
        <div className="form-group row">
          <label htmlFor="groupName" className="col-sm-2 col-form-label">단체명</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="groupName" placeholder="단체명을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="contactName" className="col-sm-2 col-form-label">담당자명</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="contactName" placeholder="담당자명을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="contactPhone" className="col-sm-2 col-form-label">연락처</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="contactPhone" placeholder="연락처를 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="contactEmail" className="col-sm-2 col-form-label">이메일</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="contactEmail" placeholder="이메일을 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="groupSize" className="col-sm-2 col-form-label">인원수</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="groupSize" placeholder="인원수를 입력하세요" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="visitDate" className="col-sm-2 col-form-label">관람일자</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="visitDate" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="additionalRequests" className="col-sm-2 col-form-label">추가 요청 사항</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="additionalRequests" rows="4" placeholder="추가 요청 사항을 입력하세요"></textarea>
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

export default CustomerView;
