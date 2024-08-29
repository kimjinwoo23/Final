<<<<<<< HEAD
import React, { useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route ,useLocation} from 'react-router-dom';
import './App.css';

//김진우
import MovieDetail from './main/MovieDetail';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainNavbar from './main/MainNavbar';
import Home from './main/Home';
import StaticNavbar from './main/StaticNavbar'; // 정적인 네비게이션 바
<<<<<<< HEAD
=======
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//조원기
import MovieChart from "./moviechart/src/Moviechart/Moviechart";
import Booking from "./moviechart/src/Movieboard-app/Booking";
import PaymentCheckoutPage from "./moviechart/src/toss/PaymentCheckoutPage";
import PaymentFailPage from "./moviechart/src/toss/PaymentFailPage";
import PaymentSuccessPage from "./moviechart/src/toss/PaymentSuccessPage";
<<<<<<< HEAD

=======
>>>>>>> wongi11

//김진우
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MainNavbar from "./main/MainNavbar";
import Home from "./main/Home";
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
=======
import Footer from './main/Footer';
>>>>>>> myeongjun


//조원기
import PaymentFailPage from './moviechart/toss/PaymentFailPage';
import PaymentCheckoutPage from './moviechart/toss/PaymentCheckoutPage';
import Booking from './moviechart/Movieboard-app/Booking';
import MovieChart from "./moviechart/Moviechart/Moviechart.js";
import PaymentSuccessPage from "./moviechart/toss/PaymentSuccessPage.js";

//차명준
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> wongi11
import MemberLogin from "./login/MemberLogin";
import MemberSignUp from "./login/MemberSignUp";
import UserInfo from "./login/UserInfo";
import RegisterCheck from "./login/RegisterCheck";
import MemberIdFind from "./login/MemberIdFind";
import MemberPwFind from "./login/MemberPwFind";
import MemberPwChange from "./login/MemberPwChange";
import LoginContext from "./login/LoginContext";
import "./css/Login.css";

<<<<<<< HEAD
//오재진
import Items from "./store/Items";
import ItemDetail from "./store/ItemDetail";
import ItemPurchase from "./store/ItemPurchase";
import Cart from "./store/Cart";

//한진화

import CustomerBoard from "./component/CustomerBoard";
import NoticeWrite from "./component/NoticeWrite";
import NoticeView from "./component/NoticeView";
import CustomerAsked from "./component/CustomerAsked";
import CustomerInquiry from "./component/CustomerInquiry";
import CustomerView from "./component/CustomerView";
import CustomerPromise from "./component/CustomerPromise";

//정상준
import MypageMain from "./mypage/MypageMain";
import MypageHome from "./mypage/MypageHome";
import MypageEditMember from "./mypage/MypageEditMember";
import MypageReservation from "./mypage/MypageReservation";
import MypageBought from "./mypage/MypageBought";
import MypageRefund from "./mypage/MypageRefund";
import MypageObo from "./mypage/MypageObo";
import MypageDeleteAccount from "./mypage/MypageDeleteAccount";

function App() {
  const isAdmin = true;

  const [loginMember, setLoginMember] = useState(null);
  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if (savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  }, []);

  useEffect(() => {
    if (loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);

  return (
    <div className="App">
      <LoginContext.Provider value={{ loginMember, setLoginMember }}>
        <Router>
          <MainNavbar />
=======
import MemberLogin from './login/MemberLogin';
import MemberSignUp from './login/MemberSignUp';
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
<<<<<<< HEAD

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
=======
>>>>>>> jin

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

//한진화
import CustomerBoard from './board/CustomerBoard';
import NoticeWrite from './board/NoticeWrite';
import NoticeView from './board/NoticeView';
import CustomerAsked from './board/CustomerAsked';
import CustomerObo from './board/CustomerObo';
import CustomerPromise from './board/CustomerPromise';
import AdminObo from './board/AdminObo';
import AdminAnswer from './board/AdminAnswer';

>>>>>>> jin

=======
//오재진
import Items from "./store/Items";
import ItemDetail from "./store/ItemDetail";
import ItemPurchase from "./store/ItemPurchase";
import Cart from "./store/Cart";

//한진화

import CustomerBoard from "./component/CustomerBoard";
import NoticeWrite from "./component/NoticeWrite";
import NoticeView from "./component/NoticeView";
import CustomerAsked from "./component/CustomerAsked";
import CustomerInquiry from "./component/CustomerInquiry";
import CustomerView from "./component/CustomerView";
import CustomerPromise from "./component/CustomerPromise";

//정상준
import MypageMain from "./mypage/MypageMain";
import MypageHome from "./mypage/MypageHome";
import MypageEditMember from "./mypage/MypageEditMember";
import MypageReservation from "./mypage/MypageReservation";
import MypageBought from "./mypage/MypageBought";
import MypageRefund from "./mypage/MypageRefund";
import MypageObo from "./mypage/MypageObo";
import MypageDeleteAccount from "./mypage/MypageDeleteAccount";
>>>>>>> wongi11

<<<<<<< HEAD
=======

>>>>>>> jinhwa2-board

<<<<<<< HEAD
function AppContent() {
  const location = useLocation();
    const isMainPage = location.pathname === '/';

  const isAdmin = true;
  
    const [loginMember, setLoginMember] = useState(null);
=======
function App() {
<<<<<<< HEAD
   const [loginMember, setLoginMember] = useState(null);
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
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
<<<<<<< HEAD
    
    <div className="App">
       <LoginContext.Provider value = {{loginMember, setLoginMember}}>
{isMainPage ? <MainNavbar /> : <StaticNavbar />}


<Routes>
     
     <Route path="/"   element =  {   <Home />   } />
     <Route path="/movie/:movieNo" element={<MovieDetail />} />
     <Route path='/memberLogin'    element= { <MemberLogin />  } />
     <Route path='/registerCheck'  element= { <RegisterCheck /> } />
     <Route path='/memberSignup'   element= { <MemberSignUp /> } />
     <Route path='/memberIdFind'   element= { <MemberIdFind />} />
     <Route path='/passwordFind'   element= { <MemberPwFind />} />
     <Route path='/passwordChange' element= { <MemberPwChange />} />
     
     
     
    


     <Route path='/store' element={<Items />} />
     <Route path='/store/detail/:itemNo' element={<ItemDetail />} />
     <Route path='/store/purchase' element={<ItemPurchase />} />
     <Route path='/store/user-cart' element={<Cart />} />
     <Route path='/store/payment/checkout' element={<ItemPaymentCheckoutPage/>} />
     <Route path='/store/payment/success' element={<ItemPaymentSuccessPage />} />
     <Route path='/store/payment/fail' element={<ItemPaymentFailPage />} />
     <Route path='/store/payment/complete' element={<ItemPaymentComplete />} />
   
     <Route path="/MypageMain/*" element={<MypageMain />}>
       <Route path="memberInfoEdit" element={<MypageEditMember />} />
       <Route path="reservation" element={<MypageReservation />} />
       <Route path="bought" element={<MypageBought />} />
       <Route path="refund" element={<MypageRefund />} />
       <Route path="comment" element={<MypageComment />} />
       <Route path="OBO" element={<MypageObo />} />
       <Route path="deleteAccount" element={<MypageDeleteAccount />} />
      </Route>
       <Route path="/customerBoard" element={<CustomerBoard />} />
     <Route path="/NoticeView/:postNo" element={<NoticeView />} />
     <Route path="/customerAsked" element={<CustomerAsked />} />
     <Route path="/CustomerObo" element={<CustomerObo />} />
     <Route path="/AdminObo" element={<AdminObo />} />
     <Route path="/customerPromise" element={<CustomerPromise />} />
     <Route path="/noticeWrite" element={<NoticeWrite />} />
     <Route path="/AdminAnswer/:oboNo" element={<AdminAnswer />}/>

<<<<<<< HEAD
      <Routes>
     
        <Route path="/"   element =  {   <Home />   } />
        <Route path="/movie/:movieNo" element={<MovieDetail />} />
        <Route path='/memberlogin' element={<MemberLogin />  } />
        <Route path='/registercheck' element = { <RegisterCheck /> } />
        <Route path='/existsmember' element = { <ExistsMember /> } />
        <Route path='/membersignup' element = { <MemberSignUp /> } />
=======

>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622

          <Routes>
            <Route path="/" element={<Home />} />

<<<<<<< HEAD
=======
  const isAdmin = true;

  const [loginMember, setLoginMember] = useState(null);
  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if (savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  }, []);

  useEffect(() => {
    if (loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);

  return (
    <div className="App">
      <LoginContext.Provider value={{ loginMember, setLoginMember }}>
        <Router>
          <MainNavbar />

          <Routes>
            <Route path="/" element={<Home />} />

>>>>>>> wongi11
            <Route path="/Moviechart" element={<MovieChart />} />
            <Route path="/Movieboard-app" element={<Booking />} />
            <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/fail" element={<PaymentFailPage />} />
<<<<<<< HEAD
=======
        <MainNavbar />
      
       
        
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
=======
>>>>>>> wongi11

            <Route path="/memberLogin" element={<MemberLogin />} />
            <Route path="/registerCheck" element={<RegisterCheck />} />
            <Route path="/memberSignup" element={<MemberSignUp />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/mamberIdFind" element={<MemberIdFind />} />
            <Route path="/passwordFind" element={<MemberPwFind />} />
            <Route path="/passwordChange" element={<MemberPwChange />} />

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> wongi11
            <Route path="/store" element={<Items />} />
            <Route path="/store/detail/:itemNo" element={<ItemDetail />} />
            <Route path="/store/purchase" element={<ItemPurchase />} />
            <Route path="/store/user-cart" element={<Cart />} />

            <Route path="/adad" element={<CustomerBoard isAdmin={true} />} />
            <Route path="/NoticeView/:postNo" element={<NoticeView />} />
            <Route path="/customerAsked" element={<CustomerAsked />} />
            <Route path="/customerInquiry" element={<CustomerInquiry />} />
            <Route path="/customerView" element={<CustomerView />} />
            <Route path="/customerPromise" element={<CustomerPromise />} />
            <Route
              path="/customerBoard"
              element={<CustomerBoard isAdmin={isAdmin} />}
            />
            <Route path="/noticeWrite" element={<NoticeWrite />} />
            <Route path="/mypagemain" element={<MypageMain />} />
          </Routes>
        </Router>
<<<<<<< HEAD
      </LoginContext.Provider>
    </div>
  );
=======
        <Route path='/memberLogin' element={<MemberLogin />  } />
        <Route path='/registerCheck' element = { <RegisterCheck /> } />
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path='/memberSignup' element = { <MemberSignUp /> } />
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
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
        <Route path="/Moviechart" element={<MovieChart/>} />
        <Route path="/Movieboard-app" element={<Booking/>} />
        <Route path="/Movietosspay" element={<PaymentCheckoutPage />} />
        <Route path="/Movietosspay/success" element={<PaymentSuccessPage />} />
        <Route path="/Movietosspay/fail" element={<PaymentFailPage />} />

        <Route path="/mypagemain" element={<MypageMain />} />
      
=======
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
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
      </Routes>
      
  
      
      </LoginContext.Provider>
  
<<<<<<< HEAD
    </div>
  
=======


>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
  )
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
=======
      </LoginContext.Provider>
    </div>
  );
>>>>>>> wongi11
=======
     <Route path="/Moviechart" element={<MovieChart />} />
         <Route path="/Movieboard-app" element={<Booking />} />
         <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
         <Route path="/payment/success" element={<PaymentSuccessPage />} />
         <Route path="/payment/fail" element={<PaymentFailPage />} />

      
  
</Routes>






</LoginContext.Provider>

  </div>
)
>>>>>>> jin
}
<<<<<<< HEAD
function App(){
return(
<Router>
<AppContent />
<Footer />
</Router> 
);
}
<<<<<<< HEAD
  export default App;
=======
export default App;
>>>>>>> 8cf4aebabf35740334030f9c231a85dba61509a5
=======
export default App;
>>>>>>> jin
