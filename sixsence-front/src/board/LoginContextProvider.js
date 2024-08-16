import React, { useState } from "react";
import LoginContext from "../login/LoginContext"; //provider가 감싸는 곳에 전파할 내용
// LoginContext에 저장된 값을 Provider가 감싸고 있는 모든 js에 저장된 값이 적용될 수 있도록

const LoginContextProvider = ({ children }) => {
  // 여기서 loginMember와 setLoginMember 상태를 관리합니다.
  const [loginMember, setLoginMember] = useState(null);

  return (
    <LoginContext.Provider value={{ loginMember, setLoginMember }}>
      {children}
    </LoginContext.Provider>
  );
};
//다른 js에서 사용할 수 있게 내보내기
//export를 해주지 않으면 다른 js에서 사용할 수 없음
export default LoginContextProvider;
