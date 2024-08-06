import React from 'react';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/MainNavbar.css";

function MainNavbar() {
  return (
    <div className="six">
      <header className="header">
        <ul className="nav-links">
          <li><Link to="/">로그인</Link></li>
          <li><Link to="/">회원가입</Link></li>
          <li><Link to="/">마이페이지</Link></li>
        </ul>
      </header>
      <Navbar className="navbar">
        <Nav className="center-nav">
          <Nav.Link href="#action2" className="navmovie">영화</Nav.Link>
          <Nav.Link href="#action3" className="navticket">예매</Nav.Link>
          <Navbar.Brand href="/" className="navmain">Sixsence</Navbar.Brand>
          <Nav.Link href="#action4" className="navstore">스토어</Nav.Link>
          <Nav.Link href="#action5" className="navborder">고객센터</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default MainNavbar;