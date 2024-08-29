import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import GoogleResult from "./GoogleResult";

const GoogleLogin = () => {
  const [loginResult, setLoginResult] = useState(null);

  console.log("로그인결과 :", loginResult);
 
  return (
    <GoogleOAuthProvider>
      <Google setLoginResult={setLoginResult} />
      <GoogleResult result={loginResult} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLogin;
