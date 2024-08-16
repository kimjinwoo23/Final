import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import "./css/MainNavbar.css"; // 새로운 스타일 시트
import LoginContext from '../login/LoginContext';

function MainNavbar() {
  const { loginMember, setLoginMember } = useContext(LoginContext);

  const handleLogout = () => {
    setLoginMember(null);
    localStorage.removeItem('loginMember');
  };

  return (
    <div className="main-navbar">
      <header className="nav-header">
        <ul className="nav-links">
          {!loginMember ? (
            <>
              <li><Link to="/MemberLogin" className="nav-link special-link">로그인</Link></li>
              <li><Link to="/MemberSignUp" className="nav-link special-link">회원가입</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={handleLogout} className="nav-link special-link">로그아웃</Link></li>
              <li><Link to="/mypagemain" className="nav-link special-link">마이페이지</Link></li>
            </>
          )}
        </ul>
      </header>
      <nav className="main-nav">
        <Link to="/Moviechart" className="nav-link">영화</Link>
        <Link to="/Booking" className="nav-link">예매</Link>
        <div className="nav-brand">
          <Link to="/" className="nav-link">Sixsence</Link>
        </div>
        <Link to="/store" className="nav-link">스토어</Link>
        <Link to="/Customer-Board" className="nav-link">고객센터</Link>
      </nav>
    </div>
  );
}

export default MainNavbar;