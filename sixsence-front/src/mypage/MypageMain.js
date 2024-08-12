import React from "react";
import {   Route, Routes } from "react-router-dom";
import MypageNavbar from "./MypageNavbar";
import MypageEditMember from "./MypageEditMember";
import MypageReservation from "./MypageReservation";
import MypageBought from "./MypageBought";
import MypageRefund from "./MypageRefund";
import MypageCommnet from "./MypageComment";
import MypageObo from "./MypageObo";
import MypageDeleteAccount from "./MypageDeleteAccount";
import MypageHome from "./MypageHome";
import './MypageCss.css';

const MypageMain = () => {
  return (
    <div className="mypageContainer">
     
        <div className="mypageUserForm">
          <p className="mypageGrade">등급</p>
          <p className="mypageWelcome">호갱님 반가워요!</p>
          <p>마일리지 : 0 p</p>
        </div>

        <MypageNavbar />
        <Routes>
          <Route path="/" element={<MypageHome />}/>
          <Route path="/mapagemain/memberInfoEdit" element={<MypageEditMember />} />
          <Route path="/mapagemain/reservation" element={<MypageReservation />} />
          <Route path="/bought" element={<MypageBought />} />
          <Route path="/refund" element={<MypageRefund />} />
          <Route path="/comment" element={<MypageCommnet />} />
          <Route path="/obo" element={<MypageObo />} />
          <Route path="/deleteAccount" element={<MypageDeleteAccount />} />
        </Routes>
      
    </div>
  );
};

export default MypageMain;
