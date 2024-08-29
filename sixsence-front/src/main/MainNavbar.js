<<<<<<< HEAD
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
<<<<<<< HEAD

=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jinhwa2-board
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
import React, {useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/MainNavbar.css";
import LoginContext from '../login/LoginContext';
<<<<<<< HEAD
function MainNavbar() {
  const {loginMember, setLoginMember} = useContext(LoginContext);
  const navigate = useNavigate();
=======
<<<<<<< HEAD


function MainNavbar() {
  const {loginMember, setLoginMember} = useContext(LoginContext);
  const navigate = useNavigate();
=======
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MainNavbar.css";
import LoginContext from '../login/LoginContext';

function MainNavbar() {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const navi = useNavigate();
>>>>>>> mypage-sjs2
=======
function MainNavbar() {
  const {loginMember, setLoginMember} = useContext(LoginContext);
  const navigate = useNavigate();
>>>>>>> jinhwa2-board
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
  // 로그아웃 버튼 클릭
  const logoutButton = () => {
    setLoginMember(null);
    localStorage.removeItem("loginMember");
<<<<<<< HEAD
    navigate("/");
  }
  console.log("loginMember : " + loginMember);
=======
<<<<<<< HEAD
<<<<<<< HEAD
    navigate('/');
  }
  console.log("loginMember : " + loginMember);
=======
    navi('/');
  };

>>>>>>> mypage-sjs2
=======
    navigate("/");
  }
  console.log("loginMember : " + loginMember);
>>>>>>> jinhwa2-board
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
=======
>>>>>>> myeongjun
  return (
    <div className="main-navbar">
      <header className="nav-header">
        <ul className="nav-links">
<<<<<<< HEAD
          {!loginMember ? (
            <>
              <li><Link to="/memberLogin" className="nav-link special-link">로그인</Link></li>
              <li><Link to="/memberSignUp" className="nav-link special-link">회원가입</Link></li>
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
        <Link to="/Movieboard-app" className="nav-link">예매</Link>
        <div className="nav-brand">
          <Link to="/" className="nav-link">Sixsence</Link>
        </div>
        <Link to="/store" className="nav-link">스토어</Link>
        <Link to="/CustomerBoard" className="nav-link">고객센터</Link>
      </nav>
=======
        {loginMember ? (<>
    {loginMember.memberName}님 환영합니다.
    <div>
    <button onClick={logoutButton}>로그아웃</button>
    </div>
    <li><Link to="/mypageMain">마이페이지</Link></li>
    </>) : (
    <>
    <li><Link to="/MemberLogin">로그인</Link></li>
    <li><Link to="/registerCheck">회원가입</Link></li>
<<<<<<< HEAD
    <li><Link to="/MemberLogin">마이페이지</Link></li>
=======
<<<<<<< HEAD
<<<<<<< HEAD
    <li><Link to="/MemberLogin">마이페이지</Link></li>
=======
    <li><Link to="/MypageMain">마이페이지</Link></li>
>>>>>>> mypage-sjs2
=======
    <li><Link to="/MemberLogin">마이페이지</Link></li>
>>>>>>> jinhwa2-board
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
    </>)}
        </ul>
      </header>
      <Navbar className="navbar">
        <Nav className="center-nav">
<<<<<<< HEAD
          <Nav.Link href="/Moviechart" className="navmovie">
            영화
          </Nav.Link>
          <Nav.Link href="/Booking" className="navticket">
            예매
          </Nav.Link>
          <Navbar.Brand href="/" className="navmain">
            Sixsence
          </Navbar.Brand>
          <Nav.Link href="/store" className="navstore">
            스토어
          </Nav.Link>
          <Nav.Link href="/Customer-Board" className="navborder">
            고객센터
          </Nav.Link>
=======
          <Nav.Link href="/Moviechart" className="navmovie">영화</Nav.Link>
          <Nav.Link href="/Movieboard-app" className="navticket">예매</Nav.Link>
          <Navbar.Brand href="/" className="navmain">Sixsence</Navbar.Brand>
          <Nav.Link href="/store" className="navstore">스토어</Nav.Link>
          <Nav.Link href="/CustomerBoard" className="navborder">고객센터</Nav.Link>
>>>>>>> jinhwa2-board
        </Nav>
      </Navbar>
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
    </div>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
export default MainNavbar;
=======
<<<<<<< HEAD

export default MainNavbar;
=======
export default MainNavbar;
>>>>>>> jinhwa2-board
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
=======
export default MainNavbar;
>>>>>>> myeongjun
