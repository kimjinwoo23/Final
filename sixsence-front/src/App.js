<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import MypageMain from "./mypage/MypageMain";

=======
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Items from './store/Items';
import ItemDetail from './store/ItemDetail';
import ItemPurchase from './store/ItemPurchase';
import Cart from './store/Cart';
import LoginContext from './LoginContext';
import React, { useEffect, useState} from 'react';
import LoginComponent from './Login';
>>>>>>> item_jaejin
=======
import Home from "./main/component/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainNavbar from './main/Layout/MainNavbar';


>>>>>>> jin

function App() {

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="App">
      <MypageMain />
=======
    <div >
   
      <MainNavbar />
   
      <Routes>
        
      <Route path="/"   element =  {   <Home />   } />




      </Routes>

      
      

      
      
>>>>>>> jin
    </div>
=======
    <Router>
      <Routes>
        <Route path='/store' element={<Items />} />
        {/*<Route path='/store:type' element={<Items />} />*/}
        {/*<Route path='/store/detail' element={<ItemDetail />} />*/}
        <Route path='/store/detail/:itemNo' element={<ItemDetail />} /> 
        {/* url 주소 뒤에 :을 붙이면 콜론뒤에 오는 부분은 변수로 작동 */}
        <Route path='/store/purchase' element={<ItemPurchase />} />
        <Route path='/store/user-cart' element={<Cart />} />
      </Routes>
    </Router>
    
>>>>>>> item_jaejin
=======
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Login.css'; 
import Header from './component/laylout/Header';
import LoginContext from './LoginContext';
import MemberLogin from './MemberLogin';
import MemberSignUp from "./MemberSignUp";
import MainHomePage from './component/MainHomePage';
import UserInfo from './UserInfo';
import RegisterCheck from './RegisterCheck';
import ExistsMember from './ExistsMember';
import MemberIdFind from './MemberIdFind';
import MemberPwFind from './MemberPwFind';
import MemberPwChange from './MemberPwChange';



function App() {
  
  const [loginMember, setLoginMember] = useState(null);
  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if(savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  },[]);

  useEffect(() => {
    if(loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  },[loginMember]);

  return (
    <LoginContext.Provider value = {{loginMember, setLoginMember}}>
    
    <Router>
      <Header />
      {/* <NavBar /> */}
    <Routes>
      <Route path='/main-Home' element = { <MainHomePage />} />

      <Route path='/member-login' element={<MemberLogin />  } />
      <Route path='/register-check' element = { <RegisterCheck /> } />
      <Route path='/exists-member' element = { <ExistsMember /> } />
      <Route path='/member-signup' element = { <MemberSignUp /> } />
      <Route path='/userinfo' element= { <UserInfo />} />
      <Route path='/mamberId-find' element= { <MemberIdFind />} />
      <Route path='/password-Find' element= { <MemberPwFind />} />
     
      <Route path='/password-change' element= { <MemberPwChange />} />

    </Routes>

    </Router> 

    </LoginContext.Provider>
>>>>>>> myungjun-login
  );
}

export default App;
<<<<<<< HEAD
=======
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerBoard from './component/CustomerBoard';
import NoticeWrite from './component/NoticeWrite';
import NoticeView from './component/NoticeView';
import CustomerAsked from './component/CustomerAsked';
import CustomerInquiry from './component/CustomerInquiry';
import CustomerView from './component/CustomerView';
import CustomerPromise from './component/CustomerPromise';
import NavBar from './component/NavBar';

function App() {
  const isAdmin = true;
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
        <Route path="/" element={<CustomerBoard isAdmin={true} />} />
        <Route path="/NoticeView/:postNo" element={<NoticeView />} />
        <Route path="/customerAsked" element={<CustomerAsked />} />
        <Route path="/customerInquiry" element={<CustomerInquiry />} />
        <Route path="/customerView" element={<CustomerView />} />
        <Route path="/customerPromise" element={<CustomerPromise />} />
        <Route path="/customerBoard" element={<CustomerBoard isAdmin={isAdmin} />} />
        <Route path="/noticeWrite" element={<NoticeWrite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
>>>>>>> jinhwa2-board
=======




>>>>>>> myungjun-login
