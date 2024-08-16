import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import MypageNavbar from "./MypageNavbar";
import "./MypageCss.css";

const MypageMain = () => {
  const loginMember = JSON.parse(localStorage.getItem("loginMember"));
  const navi = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("loginMember") === null) {
      alert(
        "해당 서비스는 로그인 후 이용 가능합니다.\n로그인을 먼저 진행해주세요."
      );
      navi("/memberlogin");
    }
  });

  return (
    <div>
      {loginMember !== null && (
        <div className="mypageContainer">
          <div className="mypageUserForm">
            <p className="mypageGrade">{loginMember.memberGrade}</p>
            <p className="mypageWelcome">
              {loginMember.memberName} 님 반가워요!
            </p>
            <p className="mypagePoint">
              마일리지 : {loginMember.memberPoint} p
            </p>
          </div>
          <MypageNavbar />
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MypageMain;
