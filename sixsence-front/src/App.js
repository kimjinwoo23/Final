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

function App() {
  //const [loginMember, setLoginMember] = useState(null);
  const [loginMember, setLoginMember] = useState(() => {
    // localStorage에서 로그인 정보를 가져옴
    const savedLoginMember = localStorage.getItem('loginMember');
    return savedLoginMember ? JSON.parse(savedLoginMember) : null;
  });

  // loginMember가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (loginMember) {
      localStorage.setItem('loginMember', JSON.stringify(loginMember));
    } else {
      localStorage.removeItem('loginMember');
    }
  }, [loginMember]);

  return (
    <LoginContext.Provider value={ {loginMember, setLoginMember} } >
    <Router>
    <Routes>
      <Route path='/user-login' element={<LoginComponent />} />
      <Route path='/store' element={<Items />} />
      {/*<Route path='/store:type' element={<Items />} />*/}
      {/*<Route path='/store/detail' element={<ItemDetail />} />*/}
      <Route path='/store/detail/:itemNo' element={<ItemDetail />} /> 
      {/* url 주소 뒤에 :을 붙이면 콜론뒤에 오는 부분은 변수로 작동 */}
      <Route path='/store/purchase' element={<ItemPurchase />} />
      <Route path='/store/user-cart' element={<Cart />} />
    </Routes>
    </Router>
    </LoginContext.Provider>
    
  );
}

export default App;
