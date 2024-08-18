import React, { useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';


//김진우
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainNavbar from './main/MainNavbar';
import Home from './main/Home';

//차명준
import MemberLogin from './login/MemberLogin';
import MemberSignUp from './login/MemberSignUp';
import UserInfo from './login/UserInfo';
import RegisterCheck from './login/RegisterCheck';
import MemberIdFind from './login/MemberIdFind';
import MemberPwFind from './login/MemberPwFind';
import MemberPwChange from './login/MemberPwChange';
import LoginContext from './login/LoginContext';
import './css/Login.css';
//오재진
import Items from './store/Items';
import ItemDetail from './store/ItemDetail';
import ItemPurchase from './store/ItemPurchase';
import Cart from './store/Cart';



//한진화

import CustomerBoard from './board/CustomerBoard';
import NoticeWrite from './board/NoticeWrite';
import NoticeView from './board/NoticeView';
import CustomerAsked from './board/CustomerAsked';
import CustomerInquiry from './board/CustomerInquiry';
import CustomerView from './board/CustomerView';
import CustomerPromise from './board/CustomerPromise';
import NavBar from './board/NavBar';

//정상준
import MypageMain from './mypage/MypageMain';
import MypageEditMember from './mypage/MypageEditMember';
import MypageReservation from './mypage/MypageReservation';
import MypageBought from './mypage/MypageBought';
import MypageRefund from './mypage/MypageRefund';
import MypageObo from './mypage/MypageObo';
import MypageDeleteAccount from './mypage/MypageDeleteAccount';
import MypageComment from './mypage/MypageComment';




function App() {
  const isAdmin = true;// 관리자인지 여부를 결정하는 변수
  
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
    <div className="App">

      <LoginContext.Provider value = {{loginMember, setLoginMember}}>
      
      <Router>

        <MainNavbar />
      
       
        

      <Routes>
        <Route path="/"   element =  {   <Home />   } />

        <Route path='/memberLogin' element={<MemberLogin />  } />
        <Route path='/registerCheck' element = { <RegisterCheck /> } />
        <Route path='/memberSignup' element = { <MemberSignUp /> } />
        <Route path='/userinfo' element= { <UserInfo />} />
        <Route path='/memberIdFind' element= { <MemberIdFind />} />
        <Route path='/passwordFind' element= { <MemberPwFind />} />
        <Route path='/passwordChange' element= { <MemberPwChange />} />

        <Route path='/store' element={<Items />} />
        <Route path='/store/detail/:itemNo' element={<ItemDetail />} /> 
        <Route path='/store/purchase' element={<ItemPurchase />} />
        <Route path='/store/user-cart' element={<Cart />} />

        
       
         {/* CustomerBoard 컴포넌트에 isAdmin 값 전달 */}
         <Route path="/customerBoard" element={<CustomerBoard isAdmin={isAdmin} />} />
        <Route path="/NoticeView/:postNo" element={<NoticeView />} />
        <Route path="/customerAsked" element={<CustomerAsked />} />
        <Route path="/customerInquiry" element={<CustomerInquiry />} />
        <Route path="/customerView" element={<CustomerView />} />
        <Route path="/customerPromise" element={<CustomerPromise />} />
        <Route path="/noticeWrite" element={<NoticeWrite />} />

        <Route path="/MypageMain/*" element={<MypageMain />}>
          <Route path="memberInfoEdit" element={<MypageEditMember />} />
          <Route path="reservation" element={<MypageReservation />} />
          <Route path="bought" element={<MypageBought />} />
          <Route path="refund" element={<MypageRefund />} />
          <Route path="comment" element={<MypageComment />} />
          <Route path="OBO" element={<MypageObo />} />
          <Route path="deleteAccount" element={<MypageDeleteAccount />} />
       </Route>
      
      
      </Routes>
  
      </Router> 
      </LoginContext.Provider>
  
    </div>

  )
}
  export default App;