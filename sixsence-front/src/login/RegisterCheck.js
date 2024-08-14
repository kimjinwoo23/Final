import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
const RegisterCheck = () => {
    const [memberCheck, setMemberCheck] = useState(null);
    const [memberName, setMemberName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [changeTrick, setChangeTrick] = useState(false);
    // 이름 정규식에서 한글 : 영어 구분
    const [inputType, setInputType] = useState("none");
    // 정규식
    const nameRegex = /^[가-힣]{2,10}$|^[a-zA-Z\s\-]{2,20}$/;
    const birthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const phoneRegex = /^(010-\d{4}-\d{4}|02-\d{3,4}-\d{4}|\d{3}-\d{3,4}-\d{4})$/;
    const navigate = useNavigate();
    // 이름 정규식에서 한글 : 영어 구분 기준
    const nameHandleChange = (e) => {
        const value = e.target.value;
        const firstChar = value.charAt(0);
        if(value.length === 0){
            setInputType("none");
        }
        // 첫 번째 문자에 따라 입력 타입 설정
        if (/^[ㄱ-힇]$/.test(firstChar)) {
            setInputType("korean");
        } else if (/^[a-zA-Z]$/.test(firstChar)) {
            setInputType("english");
        }
        // 입력 타입에 맞게 값 필터링
        if (inputType === "korean" && /^[ㄱ-힣]*$/.test(value)) {
            setMemberName(value);
        } else if (inputType === "english" && /^[a-zA-Z]*$/.test(value)) {
            setMemberName(value);
        } else if (inputType === "none") {
            setMemberName(value);  // 입력 타입이 설정되지 않은 경우에는 입력을 허용합니다.
        }
    };
    // 전화번호 형식 지정
    const formatPhoneNumber = (value) => {
        // 숫자만 !!
        const cleanedPhone = value.replace(/\D/g, '');
        // 전화번호 형식에 맞게 명령
        if (cleanedPhone.length <= 3) {
            return cleanedPhone;
        }
        if (cleanedPhone.length <= 7) {
            return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3)}`;
        }
        return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3, 7)}-${cleanedPhone.slice(7, 11)}`;
    };
    // 전화번호 핸들러
    const phoneHandleChange = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setMemberPhone(formattedPhoneNumber);
    };
    // 생년월일 형식 지정
    const formatBirthDate = (value) => {
        // 숫자만 추출
        const cleanedBirth = value.replace(/\D/g, '');
        // 날짜 형식에 맞게 포맷팅
        if (cleanedBirth.length <= 4) {
            return cleanedBirth;
        }
        if (cleanedBirth.length <= 6) {
            return `${cleanedBirth.slice(0, 4)}-${cleanedBirth.slice(4)}`;
        }
        return `${cleanedBirth.slice(0, 4)}-${cleanedBirth.slice(4, 6)}-${cleanedBirth.slice(6, 8)}`;
    };
     // 생년월일 핸들러
     const birthHandleChange = (e) => {
        const formattedDate = formatBirthDate(e.target.value);
        setMemberBirth(formattedDate);
    };
    // 가입여부 확인 버튼!
    const registerCheckButton = () => {
        // 공백 없이 입력하세요.
        if (!memberName || !memberBirth || !memberPhone) {
            alert("모든 정보를 입력해주세요.");
            return;
        }
        // 정규식 이름 생년월일 전화번호 정의
        if (!nameRegex.test(memberName)) {
            alert("이름 형식을 올바르게 입력해주세요.");
            return;
        }
        if (!birthRegex.test(memberBirth)) {
            alert("생년월일 형식을 올바르게 입력해주세요. (YYYY-MM-DD)");
            return;
        }
        if (!phoneRegex.test(memberPhone)) {
            alert("전화번호 형식을 올바르게 입력해주세요.");
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
            if (!response.ok) {
                throw new Error("서버 응답이 실패하였습니다.");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setMemberCheck(data);
                alert("가입된 아이디가 존재합니다.");
                setChangeTrick(true);
                return;
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("가입되지 않은 사용자입니다. 회원가입 페이지로 이동합니다.");
            navigate("/memberSignup");
        });
    };
    return (
        <div className="login-container">
            {!changeTrick ? (
                <>
                    <h1>회원가입 여부 확인</h1>
                    <div className="input-value">
                        <input
                            type="text"
                            value={memberName}
                            onChange={nameHandleChange}
                            placeholder="이름을 입력해주세요."
                        />
                    </div>
                    <div className="input-value">
                        <p style={{ color:"red",margin : "0",fontSize:"13px"}}>{inputType === "korean" ?
                        "한글만 입력할 수 있습니다." :
                        inputType === "english" ? "영어만 입력할 수 있습니다." : "입력 타입을 선택해 주세요."}</p>
                    </div>
                    <div className="input-value">
                        <input
                            type="text"
                            value={memberBirth}
                            onChange={birthHandleChange}
                            placeholder="법정생년월일 8자리를 입력해주세요. 예:(YYYY:MM:DD)"
                            maxLength="10" // 최대 길이를 10으로 설정 (예: YYYY-MM-DD) 더 이상 입력할 수 없게
                        />
                    </div>
                    <div className="input-value">
                        <input
                            type="text"
                            value={memberPhone}
                            onChange={phoneHandleChange}
                            placeholder="전화번호를 입력해주세요."
                        />
                    </div>
                    <div className="input-value">
                        <button className="btn btn-dark" type="button" onClick={registerCheckButton}>
                            가입여부 확인
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className='input-value'>
                        <h1>회원가입</h1>
                    </div>
                    <div className='login-container'>
                        <div className="input-value">
                            <h3>{memberCheck.memberName}님! 이미 회원으로 등록되어 있습니다.</h3>
                        </div>
                        <div className="input-value">
                            <h5>회원아이디 : ({memberCheck.memberId}) 조회 되었습니다.</h5>
                            <h5>로그인 또는 비밀번호 찾기를 진행해 주세요.</h5>
                        </div>
                        <div className="input-value">
                            <Link to="/memberLogin"><button className='btn btn-dark'>로그인</button></Link>
                        </div>
                        <div className="input-value">
                            <Link to="/passwordFind"><button>비밀번호 찾기</button></Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default RegisterCheck;