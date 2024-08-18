// src/component/CustomerPromise.js

import React from 'react';
import '../css/CustomerPromise.css';
import NavBar from './NavBar';

const CustomerPromise = () => {
  return (
    <div className="container mt-4">
      <NavBar/>
      <h2 className="text-center mb-4">이용약관</h2>
      <div className="terms-content">
        <h3>제1조 (목적)</h3>
        <p>이 약관은 회사(이하 "회사"라 한다)가 제공하는 서비스(이하 "서비스"라 한다)의 이용조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.</p>
        
        <h3>제2조 (정의)</h3>
        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <ul>
          <li>"서비스"라 함은 회사가 제공하는 모든 서비스를 말합니다.</li>
          <li>"회원"이라 함은 본 약관에 동의하고 서비스 이용 자격을 부여받은 자를 말합니다.</li>
        </ul>
        
        <h3>제3조 (약관의 게시와 개정)</h3>
        <p>회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
        
        <h3>제4조 (서비스의 제공 및 변경)</h3>
        <p>회사는 다음과 같은 서비스를 제공합니다.</p>
        <ul>
          <li>컨텐츠 제공 서비스</li>
          <li>기타 회사가 정하는 서비스</li>
        </ul>
        
        <h3>제5조 (서비스의 중단)</h3>
        <p>회사는 다음 각 호에 해당하는 경우 서비스의 제공을 중단할 수 있습니다.</p>
        <ul>
          <li>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
          <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
        </ul>
        
        <h3>제6조 (회원 탈퇴 및 자격 상실)</h3>
        <p>회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원 탈퇴를 처리합니다.</p>
        
        {/* 필요한 만큼 약관 내용을 추가합니다 */}
      </div>
    </div>
  );
};

export default CustomerPromise;
