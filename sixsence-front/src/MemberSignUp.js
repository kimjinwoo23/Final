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
    const [result, setResult] = useState("");
    const navigate = useNavigate(); // useNavigate 훅 호출
    // ID 중복 검사 변수 생성
    const [memberIdValidation, setMemberIdValidation] = useState(false);

    /* 아이디 중복 검사 이벤트 핸들러*/
    const memberIdCheck = (inputId) => {

    // inputId : 현재 입력한 ID 대입
    setMemberId(inputId);

    // 4글자 미만이면 중복 검사 X
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
                
                navigate('/main-home'); 
            } else {
                setResult("회원 가입이 실패하였습니다.");
            }
        })


    }
   

    return (

        <div className="login-container">
        
        <div className="input-value">
            <input type="text" value={memberId} className={memberIdValidation ? "" : "memberId-error"}  
            onChange={e => {memberIdCheck(e.target.value)}} placeholder="아이디를 4글자 이상 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="password" value={memberPw} 
            onChange={e => setMemberPw(e.target.value)} placeholder="비밀번호를 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="password" value={memberPwCheck} 
            onChange={e => setMemberPwCheck(e.target.value)} placeholder="비밀번호를 동일하게 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberName} 
            onChange={e => setMemberName(e.target.value)} placeholder="이름을 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberAge} 
            onChange={e => setMemberAge(e.target.value)} placeholder="나이를 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberBirth} 
            onChange={e => setMemberBirth(e.target.value)} placeholder="법정생년월일 6자리를 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberPhone} 
            onChange={e => setMemberPhone(e.target.value)} placeholder="전화번호를 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberAddress} 
            onChange={e => setMemberAddress(e.target.value)} placeholder="주소를 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberEmail} 
            onChange={e => setMemberEmail(e.target.value)} placeholder="이메일을 입력해주세요." />
        </div>

        <div className="input-value">
            <input type="text" value={memberGender} 
            onChange={e => setMemberGender(e.target.value)} placeholder="성별을 입력해주세요." />
        </div>
        
        <div className="input-value">
            <button type="submit" onClick={MemberSignUp}>회원가입</button>
        </div>
        
        </div>
        
    )
}
export default MemberSignUp;
