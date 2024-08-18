import React from "react";
import {Link} from "react-router-dom";
import '../css/NavBar.css';
const NavBar = () => {
  return (
    <div>
      <header className="headne">
        <h1 className="hecul">고객게시판</h1>
      </header>
    
    <nav className="naven">
     
     <ul>
    {/*<li><Link to="/">Home</Link></li>*/}
    <li><Link to="/customerBoard">공지사항</Link></li>
    <li><Link to="/customerAsked">자주묻는질문</Link></li>
    <li><Link to="/customerInquiry">1:1문의</Link></li>
    <li><Link to="/customerView">단체관람및개관문의</Link></li>
    <li><Link to="/customerPromise">이용약관</Link></li>
    

    </ul> 
    
    </nav>
    </div>
  );
};
export default NavBar;