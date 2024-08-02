import React from "react";
import { Link } from "react-router-dom";

const MainHeader = ()=>{
    return(
        <div className="six">
            <header className="header">
                <h2>Six Sence</h2>
                <ul>
                <li><Link to="/"><span>로그인</span></Link></li>
                <li><Link to=""><span>회원가입</span></Link></li>
                <li><Link to=""><span>마이페이지</span></Link></li>


                </ul>
            </header>


        </div>
    )
}
export default MainHeader;