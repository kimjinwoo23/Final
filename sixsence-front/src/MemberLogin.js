import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import LoginContext from './LoginContext';

const Login = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 호출

  const loginButton = () => {
    fetch("/member-Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ memberId, memberPw })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if(data.loginMember) {
        setLoginMember(data.loginMember);
        console.log('success login : ' , data.loginMember);
        localStorage.setItem('loginMember', JSON.stringify(data.loginMember));
        navigate('/main-home'); //login redirect 
      } else {
        alert('login fail');
      }
    })
    /*
    .then(map => {
      console.log(map);
      if (map.loginMember === null) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }

      console.log("******LoginMember Info******", map.loginMember);
      setLoginMember(map.loginMember);

      setMemberId("");
      setMemberPw("");
      setLoginMember(true);
      alert("로그인 되었습니다.");

      // 로그인 성공 후 페이지 이동
      navigate("/MainHome"); // 원하는 경로로 수정
    })
      */
    .catch(error => {
      console.error('Fetch error:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    });
  };

  return (
    <div className="login-container">
      {/* loginMember 값이 null 비로그인 View */}
      {!loginMember && (
        <>
          <div className="title">
            <h1>아이디와 비밀번호를 입력해주세요.</h1>
            <h6>로그인 하시면 다양한 혜택을 받으실 수 있습니다.</h6>
          </div>

          <div className="input-value">
            <input
              type="text"
              value={memberId}
              onChange={e => setMemberId(e.target.value)}
              placeholder="아이디를 입력해주세요."
            />
          </div>

          <div className="input-value">
            <input
              type="password"
              value={memberPw}
              onChange={e => setMemberPw(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>

          <div className="input-save">
            <span>
              <input type="checkbox" /> <label>아이디 저장</label>
            </span>
          </div>

          <div className="input-value">
            <button onClick={loginButton} className="btn btn-dark">로그인</button>
          </div>

          <div className="input-value">
            <a href="http://localhost:9000/naverLogin">
              <button className="btn btn-success">Naver</button>
            </a>
          </div>

          <div className="input-value">
            <a href="">
              <button type="button" className="btn btn-warning">Kakao</button>
            </a>
          </div>

          <div className='List'>
            <a href="/mamberId-find">아이디 찾기 ></a> <p> | </p> <a href="/password-Find"> 비밀번호 찾기 ></a> <p> | </p> <a href="/register-check"> 회원가입 ></a>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;