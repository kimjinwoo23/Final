import LoginContext from '../LoginContext';
import React, { useContext } from 'react';

const MainHomePage = () => {
  
  const {loginMember, setLoginMember} = useContext(LoginContext);  
    
  // 로그아웃 버튼 클릭
  const logoutButton = () => {
    setLoginMember(null);
  }
  console.log("loginMember : " + loginMember);
    return (
        <div className='login-container'>
            
         {/* loginMember 값이 존재 로그인 성공 View */}
          {loginMember && (<>
          {loginMember.memberName}님 환영합니다. 로그인에 성공하셨습니다.
          
          <div>
          <button onClick={logoutButton}>로그아웃</button>
          </div>

          </>)}

        </div>
    )
}
export default MainHomePage;