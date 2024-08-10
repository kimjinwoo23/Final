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
