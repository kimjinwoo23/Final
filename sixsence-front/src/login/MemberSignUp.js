import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
const MemberSignUp = () => {
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwCheck, setMemberPwCheck] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberAge, setMemberAge] = useState("");
    const [memberGender, setMemberGender] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberAddress, setMemberAddress] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    // 이름 한국어 or 영어
    const [inputType, setInputType] = useState("none");
    const [result, setResult] = useState("");
    // 정규식
    const nameRegex = /^[가-힣]{2,10}$|^[a-zA-Z\s\-]{2,20}$/;
    const birthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const phoneRegex = /^(010-\d{4}-\d{4}|02-\d{3,4}-\d{4}|\d{3}-\d{3,4}-\d{4})$/;
    // ID 중복 검사 변수
    const [memberIdValidation, setMemberIdValidation] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 호출
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
    /* 아이디 중복 검사 이벤트 핸들러*/
    const memberIdCheck = (inputId) => {
    // inputId : 현재 입력한 ID 대입
    setMemberId(inputId);
    // 4글자 미만이면 아이디 중복 검사 X
    if(inputId.trim().length < 4){
        setMemberIdValidation(false); // 중복 검사 여부 상태 변수
      return;
    }
    // 비동기로 아이디 중복 검사 수행
    fetch("/memberIdCheck?id=" + inputId) // url 주소로 이동할 때 inputId 값을 들고 가서 비교하겠다.
    .then(resp => resp.text())
    .then(result => {
      // 중복이 아닐 때 true, 중복이면 false
      if(Number(result) === 0) setMemberIdValidation(true);
      else                     setMemberIdValidation(false);
    })
  }
    // 회원가입
    const MemberSignUp = () => {
    //아이디가 유효하지 않을 때
        if(!memberIdValidation){
            alert("아이디가 유효하지 않습니다.");
            return;
        }
        // 비밀번호, 비밀번호 확인이 일치하지 않을 때
        if(memberPw !== memberPwCheck){
            alert("비밀번호가 일치하지 않습니다.");
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
        // 사용자 입력 정보의 집합
        const memberInputInfo = {};
        memberInputInfo.memberId = memberId;
        memberInputInfo.memberPw = memberPw;
        memberInputInfo.memberPwCheck = memberPwCheck;
        memberInputInfo.memberName = memberName;
        memberInputInfo.memberAge = memberAge;
        memberInputInfo.memberGender = memberGender;
        memberInputInfo.memberBirth = memberBirth;
        memberInputInfo.memberEmail = memberEmail;
        memberInputInfo.memberAddress = memberAddress;
        memberInputInfo.memberPhone = memberPhone;
        fetch("/memberSignUp", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(memberInputInfo)
        })
        .then(response => response.text())
        .then(result => {
            if(Number(result) > 0){
                alert("회원 가입이 완료되었습니다.");
                setMemberId("")
                setMemberPw("")
                setMemberPwCheck("")
                setMemberName("")
                setMemberAge("")
                setMemberGender("")
                setMemberBirth("")
                setMemberEmail("")
                setMemberAddress("")
                setMemberPhone("")
                navigate('/');
            } else {
                setResult("회원 가입이 실패하였습니다.");
            }
        })
    }
    return (
        <div className="login-container">
        <div className="input-value">
            <input type="text" value={memberId} className={memberIdValidation ? "" : "memberId-error"}
            onChange={e => {memberIdCheck(e.target.value)}} placeholder="아이디를 4글자 이상 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="password" value={memberPw}
            onChange={e => setMemberPw(e.target.value)} placeholder="비밀번호를 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="password" value={memberPwCheck}
            onChange={e => setMemberPwCheck(e.target.value)} placeholder="비밀번호를 동일하게 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="text" value={memberName}
            onChange={nameHandleChange} placeholder="이름을 입력해주세요." required/>
        </div>
        {/* 첫글자에 따른 영어 or 한국어만 */}
        <div className="input-value">
                <p style={{ color:"red",margin : "0",fontSize:"13px"}}>{inputType === "korean" ?
                "한글만 입력할 수 있습니다." :
                inputType === "english" ? "영어만 입력할 수 있습니다." : "입력 타입을 선택해 주세요."}</p>
            </div>
        <div className="input-value">
            <input type="text" value={memberAge}
            onChange={e => setMemberAge(e.target.value)} placeholder="나이를 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="text" value={memberBirth}
            onChange={birthHandleChange}
            placeholder="법정생년월일 8자리를 입력해주세요." required
             maxLength="10"
            />
        </div>
        <div className="input-value">
            <input type="text" value={memberPhone}
            onChange={phoneHandleChange}
            placeholder="전화번호를 입력해주세요." required
            />
        </div>
        <div className="input-value">
            <input type="text" value={memberAddress}
            onChange={e => setMemberAddress(e.target.value)} placeholder="주소를 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="text" value={memberEmail}
            onChange={e => setMemberEmail(e.target.value)} placeholder="이메일을 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="text" value={memberGender}
            onChange={e => setMemberGender(e.target.value)} placeholder="성별을 입력해주세요." required/>
        </div>
        <div className="input-value">
            <button type="submit" className="btn btn-dark" onClick={MemberSignUp}>회원가입</button>
        </div>
        </div>
    )
}
export default MemberSignUp;