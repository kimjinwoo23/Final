import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from './LoginContext';

const LoginComponent = () => {

  /* 전역 변수 Context에서 (좌변)변수명과 (우변)키가 일치하는 값을 얻어와 대입 */
  const { loginMember, setLoginMember } = useContext(LoginContext);

  const navigate = useNavigate();

  /* 아이디, 비밀번호 상태 변수 */
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  /* 로그인 이벤트 핸들러 */
  const login = () => { 

    fetch('/login', {
      method : "POST",
      headers : {"Content-Type" : "application/json", // 클 -> 서 요청 데이터 형식
                 "Accept" : "application/json" },     // 서 -> 클 응답 데이터 형식
      body : JSON.stringify({memberId : id, memberPw : pw})
    })
    .then(resp => resp.json())
    .then(map => {
      console.log(map);

      // 로그인 실패 시
      if(map.loginMember === null){
        alert('아이디 또는 비밀번호가 일치하지 않습니다');
        return;
      }

      // 로그인 성공 시
      alert('로그인 성공');
      setLoginMember(map.loginMember);
      localStorage.setItem('loginMember', JSON.stringify(loginMember));
      // 부모(App.js)의 상태 변수 변경 -> 리랜더링
      // console.info("login : ", map.loginMember)
      setId('');
      setPw(''); // id,pw 입력된 값 지우기

      navigate("/store");

    })
   }


  /* 로그아웃 이벤트 핸들러 */
  const logout = () => { 
    setLoginMember(null); 
    localStorage.removeItem('loginMember');
  }


  return (
    <div className="login-container">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>
              <input type="text" onChange={e => setId(e.target.value)} value={id} />
            </td>
          </tr>

          <tr>
            <th>PW</th>
            <td>
              <input type="password" onChange={e => setPw(e.target.value)} value={pw} />
            </td>
            <td>
              <button onClick={login} >Login</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* loginMember가 null이 아닌 경우 로그아웃 버튼 출력 */}
      {loginMember && (
        <button onClick={logout}>로그아웃</button>
      )}
    </div>
  );

}

export default LoginComponent;