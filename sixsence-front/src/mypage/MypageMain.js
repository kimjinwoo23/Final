import React from "react";
import {   Outlet, Route, Routes } from "react-router-dom";
import MypageNavbar from "./MypageNavbar";
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
        <Outlet />
    </div>
  );
};

export default MypageMain;
