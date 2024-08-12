import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import LoginContext from "./LoginContext";

const RegisterCheck = () => {
    const { loginMember, setLoginMember } = useContext(LoginContext);

    const [memberName, setMemberName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const navigate = useNavigate();

    const registerCheckButton = () => {
        // 데이터 검증
        if (!memberName || !memberBirth || !memberPhone) {
            alert("모든 정보를 입력해주세요.");
            return;
        }

        fetch("/register-check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ memberName, memberBirth, memberPhone })
        })
        .then(response => {
            console.log("response : " , response.status);
            if (!response.ok) {
                throw new Error("서버 응답이 실패하였습니다.");
            }
            return response.json();
        })
        .then(data => {
            console.log("data : " + data)
            console.log("data.loginMember : " +data.loginMember)
            
            if (data > 0) {
                console.log("Register info:" + data)
                setLoginMember(data);
              ;
                alert("가입된 아이디가 존재합니다. ");
                navigate('/exists-member');
            } else {
                alert("가입되지 않은 사용자입니다. 회원가입 페이지로 이동합니다.");
                navigate("/member-signup");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("가입 여부 확인 중 오류가 발생했습니다.");
        });
    };

    return (
        <div className="login-container">
            <h1>회원가입 여부 확인</h1>
            <div className="input-value">
                <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="이름을 입력해주세요."
                />
            </div>
            <div className="input-value">
                <input
                    type="text"
                    value={memberBirth}
                    onChange={(e) => setMemberBirth(e.target.value)}
                    placeholder="법정생년월일 6자리를 입력해주세요."
                />
            </div>
            <div className="input-value">
                <input
                    type="text"
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    placeholder="전화번호를 입력해주세요."
                />
            </div>
            <div className="input-value">
                <button className="btn btn-dark" type="submit" onClick={registerCheckButton}>
                    가입여부 확인
                </button>
            </div>
        </div>
    );
};

export default RegisterCheck;