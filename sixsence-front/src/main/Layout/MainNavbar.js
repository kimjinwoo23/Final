import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/MainNavbar.css";

function MainNavbar() {
  return (
    <Navbar className="navbar">
      <Container fluid className="flex container [flexgrow] ">
        <Nav className="left-nav flex-grow:1">
          <Nav.Link href="#action2" className="navmovie">영화</Nav.Link>
          <Nav.Link href="#action3" className="navticket">예매</Nav.Link>
        </Nav>
        <Navbar.Brand href="/" className="navmain flex-grow:1 ">Sixsence</Navbar.Brand>
        <Nav className="right-nav  flex-grow:1  ">
          <Nav.Link href="#action4" className="navstore">스토어</Nav.Link>
          <Nav.Link href="#action5" className="navborder">고객센터</Nav.Link>
        </Nav>
        <Form className="d-flex search-form flex-grow:1  ">
          <Form.Control 
            type="search"
            className=' search-input'
            placeholder="Search"
            aria-label="Search"
          />
          <Button variant="outline-success" className="search-button" >Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;