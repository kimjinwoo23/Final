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
  return (
    <div className="six">
      <header className="header">
        <ul className="nav-links">
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
    </div>
  );
}
<<<<<<< HEAD
export default MainNavbar;
=======
<<<<<<< HEAD

export default MainNavbar;
=======
export default MainNavbar;
>>>>>>> jinhwa2-board
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
