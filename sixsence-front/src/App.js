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
import { ItemPaymentCheckoutPage } from './store/payment/ItemPaymentCheckoutPage';
import ItemPaymentFailPage from './store/payment/ItemPaymentFailPage';
import ItemPaymentSuccessPage from './store/payment/ItemPaymentSuccessPage';
import ItemPaymentComplete from './store/ItemPaymentComplete';

//한진화
<<<<<<< HEAD
import CustomerBoard from './component/CustomerBoard';
import NoticeWrite from './component/NoticeWrite';
import NoticeView from './component/NoticeView';
import CustomerAsked from './component/CustomerAsked';
import CustomerInquiry from './component/CustomerInquiry';
import CustomerView from './component/CustomerView';
import CustomerPromise from './component/CustomerPromise';
=======

import CustomerBoard from './board/CustomerBoard';
import NoticeWrite from './board/NoticeWrite';
import NoticeView from './board/NoticeView';
import CustomerAsked from './board/CustomerAsked';
import CustomerObo from './board/CustomerObo';
import CustomerPromise from './board/CustomerPromise';
import BoardNavBar from './board/BoardNavBar';
import AdminObo from './board/AdminObo';
import AdminAnswer from './board/AdminAnswer';
>>>>>>> jinhwa2-board

//정상준
import MypageMain from './mypage/MypageMain';
import MypageEditMember from './mypage/MypageEditMember';
import MypageReservation from './mypage/MypageReservation';
import MypageBought from './mypage/MypageBought';
import MypageRefund from './mypage/MypageRefund';
import MypageObo from './mypage/MypageObo';
import MypageDeleteAccount from './mypage/MypageDeleteAccount';
import MypageComment from './mypage/MypageComment';


<<<<<<< HEAD
=======

>>>>>>> jinhwa2-board

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

        <MainNavbar />
      
       
        

      <Routes>
        <Route path="/"   element =  {   <Home />   } />

        <Route path='/memberLogin' element={<MemberLogin />  } />
        <Route path='/registerCheck' element = { <RegisterCheck /> } />
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path='/memberSignup' element = { <MemberSignUp /> } />
        <Route path='/userinfo' element= { <UserInfo />} />
        <Route path='/memberIdFind' element= { <MemberIdFind />} />
=======
        <Route path='/existsMember' element = { <ExistsMember /> } />
        <Route path='/memberSignup' element = { <MemberSignUp /> } />
        <Route path='/userinfo' element= { <UserInfo />} />
        <Route path='/mamberIdFind' element= { <MemberIdFind />} />
>>>>>>> mypage-sjs2
=======
        <Route path='/memberSignup' element = { <MemberSignUp /> } />
        <Route path='/userinfo' element= { <UserInfo />} />
        <Route path='/memberIdFind' element= { <MemberIdFind />} />
>>>>>>> jinhwa2-board
        <Route path='/passwordFind' element= { <MemberPwFind />} />
        <Route path='/passwordChange' element= { <MemberPwChange />} />

        <Route path='/store' element={<Items />} />
        <Route path='/store/detail/:itemNo' element={<ItemDetail />} /> 
        <Route path='/store/purchase' element={<ItemPurchase />} />
        <Route path='/store/user-cart' element={<Cart />} />
        <Route path='/store/payment/checkout' element={<ItemPaymentCheckoutPage/>} />
        <Route path='/store/payment/success' element={<ItemPaymentSuccessPage />} />
        <Route path='/store/payment/fail' element={<ItemPaymentFailPage />} />
        <Route path='/store/payment/complete' element={<ItemPaymentComplete />} />
        

        
       
         {/* CustomerBoard 컴포넌트에 isAdmin 값 전달 */}
         <Route path="/customerBoard" element={<CustomerBoard />} />
        <Route path="/NoticeView/:postNo" element={<NoticeView />} />
        <Route path="/customerAsked" element={<CustomerAsked />} />
        <Route path="/CustomerObo" element={<CustomerObo />} />
        <Route path="/AdminObo" element={<AdminObo />} /> 
        <Route path="/customerPromise" element={<CustomerPromise />} />
        <Route path="/noticeWrite" element={<NoticeWrite />} />
<<<<<<< HEAD

=======
        <Route path="/AdminAnswer/:oboNo" element={<AdminAnswer />}/>
>>>>>>> jinhwa2-board
        <Route path="/MypageMain/*" element={<MypageMain />}>
          <Route path="memberInfoEdit" element={<MypageEditMember />} />
          <Route path="reservation" element={<MypageReservation />} />
          <Route path="bought" element={<MypageBought />} />
          <Route path="refund" element={<MypageRefund />} />
          <Route path="comment" element={<MypageComment />} />
          <Route path="OBO" element={<MypageObo />} />
          <Route path="deleteAccount" element={<MypageDeleteAccount />} />
       </Route>
<<<<<<< HEAD
=======
      
      
>>>>>>> jinhwa2-board
      </Routes>
  
      </Router> 
      </LoginContext.Provider>
  


  )
}
  export default App;