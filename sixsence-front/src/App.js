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

function App() {

  return (
<<<<<<< HEAD
    <div className="App">
      <MypageMain />
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
  );
}

export default App;
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
