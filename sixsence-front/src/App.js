import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Login.css'; 
import Header from './component/laylout/Header';
import NavBar from "./component/laylout/MainNavbar";
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
  );
}

export default App;




