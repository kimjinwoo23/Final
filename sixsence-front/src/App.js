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

import MovieChart from './moviechart/src/Moviechart/Moviechart';
import Booking from './moviechart/src/Movieboard-app/Booking';
import { PaymentCheckoutPage } from './moviechart/src/Movietosspay/PaymentCheckoutPage';
import { PaymentFailPage } from './moviechart/src/Movietosspay/PaymentFailPage';
import { PaymentSuccessPage } from './moviechart/src/Movietosspay/PaymentSuccessPage';
//차명준
import MemberLogin from './login/MemberLogin';
import MemberSignUp from './login/MemberSignUp';
import UserInfo from './login/UserInfo';
import RegisterCheck from './login/RegisterCheck';
import ExistsMember from './login/ExistsMember';
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

import CustomerBoard from './component/CustomerBoard';
import NoticeWrite from './component/NoticeWrite';
import NoticeView from './component/NoticeView';
import CustomerAsked from './component/CustomerAsked';
import CustomerInquiry from './component/CustomerInquiry';
import CustomerView from './component/CustomerView';
import CustomerPromise from './component/CustomerPromise';

//정상준
import MypageMain from './mypage/MypageMain';
import MypageHome from './mypage/MypageHome';
import MypageEditMember from './mypage/MypageEditMember';
import MypageReservation from './mypage/MypageReservation';
import MypageBought from './mypage/MypageBought';
import MypageRefund from './mypage/MypageRefund';
import MypageObo from './mypage/MypageObo';
import MypageDeleteAccount from './mypage/MypageDeleteAccount';

function AppContent() {
  const location = useLocation();
    const isMainPage = location.pathname === '/';

  const isAdmin = true;
  
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
{isMainPage ? <MainNavbar /> : <StaticNavbar />}
     
     
          

     

   
       
       

      <Routes>
     
        <Route path="/"   element =  {   <Home />   } />
        <Route path="/movie/:movieNo" element={<MovieDetail />} />
        <Route path='/memberlogin' element={<MemberLogin />  } />
        <Route path='/registercheck' element = { <RegisterCheck /> } />
        <Route path='/existsmember' element = { <ExistsMember /> } />
        <Route path='/membersignup' element = { <MemberSignUp /> } />
        <Route path='/userinfo' element= { <UserInfo />} />
        <Route path='/mamberIdfind' element= { <MemberIdFind />} />
        <Route path='/passwordFind' element= { <MemberPwFind />} />
        <Route path='/passwordchange' element= { <MemberPwChange />} />

        <Route path='/store' element={<Items />} />
        <Route path='/store/detail/:itemNo' element={<ItemDetail />} /> 
        <Route path='/store/purchase' element={<ItemPurchase />} />
        <Route path='/store/user-cart' element={<Cart />} />

        <Route path="/adad" element={<CustomerBoard isAdmin={true} />} />
        <Route path="/NoticeView/:postNo" element={<NoticeView />} />
        <Route path="/customerAsked" element={<CustomerAsked />} />
        <Route path="/customerInquiry" element={<CustomerInquiry />} />
        <Route path="/customerView" element={<CustomerView />} />
        <Route path="/customerPromise" element={<CustomerPromise />} />
        <Route path="/customerBoard" element={<CustomerBoard isAdmin={isAdmin} />} />
        <Route path="/noticeWrite" element={<NoticeWrite />} />
        <Route path="/Moviechart" element={<MovieChart/>} />
        <Route path="/Movieboard-app" element={<Booking/>} />
        <Route path="/Movietosspay" element={<PaymentCheckoutPage />} />
        <Route path="/Movietosspay/success" element={<PaymentSuccessPage />} />
        <Route path="/Movietosspay/fail" element={<PaymentFailPage />} />

        <Route path="/mypagemain" element={<MypageMain />} />
      
      </Routes>
      
  
      
      </LoginContext.Provider>
  
    </div>
  
  )
}
function App(){
  return(
<Router>
<AppContent />
</Router> 
  );
}
  export default App;