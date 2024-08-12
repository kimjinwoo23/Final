import React from "react";
import { Link } from "react-router-dom";
import "../css/MainHeader.css";

const MainHeader = () => {
  return (
    <div className="six">
      <header className="header">
        <ul className="nav-links">
          <li><Link to="/">로그인</Link></li>
          <li><Link to="/">회원가입</Link></li>
          <li><Link to="/">마이페이지</Link></li>
        </ul>
      </header>
    </div>
  );
}

export default MainHeader;