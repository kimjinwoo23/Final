import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import AddressSearch from "./AddressSearch";
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
    const [emailPlug, setEmailPlug] = useState(null);
    // 이름 한국어 or 영어
    const [inputType, setInputType] = useState("none");

    // 정규식
    const idRegex = /^[a-zA-Z0-9]{8,15}$/ 
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{10,15}$/;
    const nameRegex = /^[가-힣]{1,6}$|^[a-zA-Z\s\-]{5,15}$/;
    const consonantVowelRegex = /^[ㄱ-ㅎㅏ-ㅣ]+$/;  
    const phoneRegex = /^(01[016789])[-\s]?\d{3,4}[-\s]?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // 주민등록번호 7자리 정규식
    const birthRegex = /^\d{6}-[1-4]$/;
 

    
    // ID 중복 검사 변수
    const [memberIdValidation, setMemberIdValidation] = useState(false);

    const navigate = useNavigate(); // useNavigate 훅 호출
    
    // 주소 핸들러
    const handleAddressChange = (address) => {
        setMemberAddress(address);
      };
    

    // 이름 핸들러
    const nameHandleChange = (e) => {
        const value = e.target.value;
        const firstChar = value.charAt(0);
<<<<<<< HEAD
=======
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
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        // 첫 번째 문자에 따라 입력 타입 설정
        if (/^[ㄱ-힇]$/.test(firstChar)) {
            setInputType("korean");
        } else if (/^[a-zA-Z]$/.test(firstChar)) {
            setInputType("english");
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
=======

>>>>>>> myeongjun
        // 입력 타입에 맞게 값 필터링
        if (inputType === "korean" && /^[ㄱ-힣]*$/.test(value)) {
            setMemberName(value);
        } else if (inputType === "english" && /^[a-zA-Z]*$/.test(value)) {
            setMemberName(value);
        } else if (inputType === "none") {
            setMemberName(value);  // 입력 타입이 설정되지 않은 경우에는 입력을 허용합니다.
        }
    };
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
        // 비밀번호 입력시 <p> 태그 활용하기 위해서 
        const isPasswordValid = passwordRegex.test(memberPw) && passwordRegex.test(memberPwCheck);
        const arePasswordsMatching = memberPw === memberPwCheck;
        const isInputFilled = memberPw && memberPwCheck;

       // *****************************************전화번호 형식 ********************************************
       const formatPhoneNumber = (value) => {
        const cleanedPhone = value.replace(/\D/g, '');
        
<<<<<<< HEAD
=======
       // 전화번호 형식 지정
       const formatPhoneNumber = (value) => {
        // 숫자만 !!
        const cleanedPhone = value.replace(/\D/g, '');
        // 전화번호 형식에 맞게 명령
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        if (cleanedPhone.length <= 3) {
            return cleanedPhone;
        }
        if (cleanedPhone.length <= 7) {
            return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3)}`;
        }
        return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3, 7)}-${cleanedPhone.slice(7, 11)}`;
    };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
=======

>>>>>>> myeongjun
    // 전화번호 핸들러
    const phoneHandleChange = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setMemberPhone(formattedPhoneNumber);
    };
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
    // *******************************************************************************************************
//---------------------------------------------주민번호 날짜 관련 정규식 부가적인 요소------------------------------------------------
// 날짜 유효성 검사 함수
const isDateValid = (birthDate) => {
    const [datePart, genderPart] = birthDate.split('-');
    
    // 날짜 부분이 올바른지 확인
    if (datePart.length !== 6 || !/^\d{6}$/.test(datePart) || !/^[1-4]$/.test(genderPart)) {
        return false;
    }
    
    // 연도, 월, 일 추출
    const yy = parseInt(datePart.slice(0, 2), 10);
    const mm = parseInt(datePart.slice(2, 4), 10);
    const dd = parseInt(datePart.slice(4, 6), 10);
    
    // YY를 YYYY로 변환
    const year = yy >= 0 && yy <= 99 ? (yy < 30 ? 2000 + yy : 1900 + yy) : yy;
    
    // 월과 일 유효성 검사
    if (mm < 1 || mm > 12) return false; // 월이 1~12 사이인지 확인
    
    // 월에 따라 일자 유효성 검사
    const daysInMonth = new Date(year, mm, 0).getDate();
    if (dd < 1 || dd > daysInMonth) return false; // 일자가 월의 일수 범위 내인지 확인
    
    return true;
};
// ----------------------------------------------------------------------------------------------------------------------------------------

//*************************************** 나이 계산 함수 *******************************************
const calculateAge = (birthDate) => {
    const [year, month, day] = [birthDate.slice(0, 4), birthDate.slice(4, 6), birthDate.slice(6, 8)];
    const birthYear = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
};

// -------------------------------------- 성별 추출 함수 ----------------------------------------------
const getGender = (genderCode) => {
    switch (genderCode) {
        case '1': case '3':
            return 'Male'; // 1900년대 남성 또는 2000년대 남성
        case '2': case '4':
            return 'Female'; // 1900년대 여성 또는 2000년대 여성
        default:
            return 'Unknown';
    }
};
     // 입력값 처리 함수
     const birthHandleChange = (e) => {
        let value = e.target.value;
        
        // 숫자만 허용
        value = value.replace(/[^\d]/g, '');
        
        // 하이픈 추가
        if (value.length > 6) {
            value = value.slice(0, 6) + '-' + value.slice(6, 7);
        }
        
        setMemberBirth(value);
        
        // 주민등록번호가 올바른 형식일 경우에만 나이와 성별 계산
        if (/^\d{6}-[1-4]$/.test(value)) {
            const [datePart, genderPart] = value.split('-');
            const yearPrefix = genderPart === '1' || genderPart === '2' ? '19' : '20';
            const fullDate = yearPrefix + datePart;
            const age = calculateAge(fullDate);
            const gender = getGender(genderPart);
            setMemberAge(age);
            setMemberGender(gender);
        } else {
            setMemberAge('');
            setMemberGender('');
        }
    };

/* ----------------------------------아이디를 입력했을 때 그 값이 DB에 중복된 값이 없는지 미리 확인하고 true false 반환하여 중복 여부 확인 버튼에서 사용 ---------------------------------------------*/


    const memberIdCheck = (inputId) => {
    // inputId : 현재 입력한 ID 대입
      setMemberId(inputId);
<<<<<<< HEAD
=======
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
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
    // 비동기로 아이디 중복 검사 수행
    fetch("memberIdCheck?id=" + inputId) // url 주소로 이동할 때 inputId 값을 들고 가서 비교하겠다.
    .then(resp => resp.text())
    .then(result => {

      // 중복이 아닐 때 true, 중복이면 false
      if(Number(result) === 0) 
        setMemberIdValidation(true);
      else                     
      setMemberIdValidation(false);
    })
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
  } 
  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ****************************************************************** 아이디 중복 검사 버튼 및 아이디 정규식 모음 ************************************************************************
    const duplicationIdCheck = () => { 
    if (!memberId.trim()) {
        alert("아이디를 입력해주세요.");
        return;
    } 
    if (consonantVowelRegex.test(memberId)) {
        alert("올바른 형식으로 입력해주세요.");
        setMemberIdValidation(false);
        return;
    }
    if(memberId.length < 8 || memberId.length > 15){
        alert("올바르지 않은 형식입니다.");
        return;
    }    
    if(memberIdValidation){
        alert("사용 가능한 아이디입니다.");
    } else {
        alert("중복 되는 아이디가 존재합니다.");
        return;
    }
    }
    const emailHandleChange = (e) => {
        setMemberEmail(e.target.value);
    };
    // *******************************************************************************************************************************************************************************
    
    /* 이메일 중복 검사 */
    const emailCheck = () => {
        // ------------------------------------------------------------------------- 이메일 중복 검사 ----------------------------------------------------------------------------------------------
       
        axios.post("/memberEmailCheck?email=" + memberEmail)
        .then(response => {
            if(Number(response.data) ==! 0){
                setEmailPlug(true);
            } else {
                setEmailPlug(false);
            }
        })
        .catch(err => {
            alert("Error : " + err);
        })

        if(emailPlug){
            alert("중복되는 이메일이 존재합니다.");
            return;
        } else{
            alert("사용 가능한 이메일입니다.");
        }
    }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------[!회원가입 버튼!]----------------------------------------------------------------------------------------------
   
   
    const MemberSignUpButton = () => {
        
        //아이디가 유효하지 않을 때 
<<<<<<< HEAD
=======
  }
    // 회원가입
    const MemberSignUp = () => {
    //아이디가 유효하지 않을 때
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        if(!memberIdValidation){
            alert("아이디 중복 검사를 확인 해주세요. ");
            return;
        }
        if(emailPlug === null){
            alert("이메일 중복 검사를 확인 해주세요.");
            return;
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
        
        // 비밀번호 공백 불가
        if(!memberPw || !memberPwCheck){
            alert("비밀번호를 입력해주세요.");
            return;
        }
        // 비밀번호가 불일치
<<<<<<< HEAD
=======
        // 비밀번호, 비밀번호 확인이 일치하지 않을 때
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        if(memberPw !== memberPwCheck){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
        // 비밀번호 정규식
        if(!passwordRegex.test(memberPw) || !passwordRegex.test(memberPwCheck)){
            alert("비밀번호를 올바른 형식으로 입력해주세요.");
            return;
        }
        // 이름 공백 불가
        if(!memberName.trim()){
            alert("이름을 입력해주세요.");
            return;
        }
        // 이름 정규식 
        if (!nameRegex.test(memberName)) {
            alert("이름을 올바른 형식으로 입력해주세요.");
            return;
        }
        // 주민번호 공백 불가
        if(!memberBirth.trim()){
            alert("생년월일을 입력해주세요.");
            return;
        }
        // 주민번호 정규식 
        if (!birthRegex.test(memberBirth)) {
            alert("생년월일 형식을 올바르게 입력해주세요. (oooooo-o)");
            return;
        }
        // 전화번호 공백 불가
        if(!memberPhone){
            alert("전화번호를 입력해주세요.");
            return;
        }
        // 전화번호 정규식 
        if (!phoneRegex.test(memberPhone)) {
            alert("전화번호를 올바른 형식으로 입력해주세요.");
            return;
        }
        // 이메일 공백 불가
        if(!memberEmail.trim()){
            alert("이메일을 입력해주세요.");
            return;
        }
        // 이메일 정규식
        if(!emailRegex.test(memberEmail)){
            alert("이메일이 형식을 올바르게 입력해주세요.");
            return;
        }
        
        // **************************************************************   사용자 입력 정보의 집합   ***********************************************************************
<<<<<<< HEAD
=======
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
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
        /*********************************************************************************************************************************************************************/
       
        
  // ****************************************************************** 회원 가입 INPUT 정보 Controller 로 보내는 Fetch ***********************************************************************      
<<<<<<< HEAD
=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
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
<<<<<<< HEAD
<<<<<<< HEAD
                
                navigate('/'); 
=======
                navigate('/');
>>>>>>> jinhwa2-board
=======
                
                navigate('/'); 
>>>>>>> jin
            } else {
                alert("회원 가입이 실패하였습니다.");
            }
        })
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
    // *************************************************************************************************************************************************************************************
    return (
        <div className="login-container">
        
        {/*-------------------------------------------------------------------------- 아이디 --------------------------------------------------------------------------*/}
        <div className="input-value">
            <input type="text" value={memberId} className={memberIdValidation ? "" : "memberId-error"}  
            onChange={e => {memberIdCheck(e.target.value)}} placeholder="아이디를 입력해주세요." required/>
        </div>
        {memberId && ( 
        idRegex.test(memberId) ? (
            <p style={{ color: "green", margin: "0", fontSize: "13px" }}>
                올바른 형식입니다.
            </p>
        ) : (
            <p style={{ color: "red", margin: "0", fontSize: "13px" }}>
                8 ~ 15 자 영문 또는 숫자를 입력해주세요.
            </p>
        )
        )}
         <button className="btn btn-dark" onClick={duplicationIdCheck}>아이디 중복 확인</button>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {/*************************************************************************** 비밀번호 ********************************************************************************/ }
        <div className="input-value">
            <input type="password" value={memberPw} 
<<<<<<< HEAD
=======
    return (
        <div className="login-container">
        <div className="input-value">
            <input type="text" value={memberId} className={memberIdValidation ? "" : "memberId-error"}
            onChange={e => {memberIdCheck(e.target.value)}} placeholder="아이디를 4글자 이상 입력해주세요." required/>
        </div>
        <div className="input-value">
            <input type="password" value={memberPw}
>>>>>>> jinhwa2-board
            onChange={e => setMemberPw(e.target.value)} placeholder="비밀번호를 입력해주세요." required/>
        </div>

        <div className="input-value">
<<<<<<< HEAD
=======
            onChange={e => setMemberPw(e.target.value)} placeholder="비밀번호를 입력해주세요." required/>
        </div>
        <div className="input-value">
>>>>>>> jin
            <input type="password" value={memberPwCheck} 
            onChange={e => setMemberPwCheck(e.target.value)} placeholder="비밀번호를 재 입력해주세요." required/>
        </div>
         
         {isInputFilled && (
            <>
                {isPasswordValid && arePasswordsMatching ? (
                    <p style={{ color: "green", margin: "0", fontSize: "13px" }}>비밀번호가 일치합니다.</p>
                ) : (
                    <>
                        {!arePasswordsMatching && (
                            <p style={{ color: "red", margin: "0", fontSize: "13px" }}>비밀번호가 일치하지 않습니다.</p>
                        )}
                        {!isPasswordValid && (
                            <p style={{ color: "red", margin: "0", fontSize: "13px" }}>
                                비밀번호는 10 ~ 15 자, 특수문자를 포함해야 합니다.
                            </p>
                        )}
                    </>
                )}
            </>
        )}
         {/********************************************************************************************************************************************************************/ }

        {/*-------------------------------------------------------------------------- 이름 --------------------------------------------------------------------------*/}
        <div className="input-value">
            <input type="text" value={memberName} 
            onChange={nameHandleChange} placeholder="이름을 입력해주세요." required/>
        </div>
        {memberName && (
        <p style={{
                color: nameRegex.test(memberName) ? "green" : "red",
                margin: "0",
                fontSize: "13px"}}>
                {inputType === "korean"
                    ? nameRegex.test(memberName)
                        ? "올바른 형식입니다."
                        : "한글 1 ~ 6 글자 입력해주세요. *) 자음, 모음만 사용할 수 없습니다."
                    : inputType === "english"
                    ? nameRegex.test(memberName)
                        ? "올바른 형식입니다."
                        : "영어 5 ~ 15 글자 입력해주세요."
                    : "언어: 한글 / 영어"}
        </p>
    )}
     {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}


     {/* ******************************************************************** 주민번호 ************************************************************************** */}
             <div>
            <input
                type="text"
                value={memberBirth}
                onChange={birthHandleChange}
                placeholder="주민번호 7자리를 입력해주세요 / (-) 자동 생성"
                required
                maxLength="8" // 하이픈 포함 최대 8자리
            />
            {memberBirth && (
                <p style={{ color: (birthRegex.test(memberBirth) && isDateValid(memberBirth)) ? "green" : "red", margin: "0", fontSize: "13px" }}>
                    {birthRegex.test(memberBirth) && isDateValid(memberBirth) ? 
                        `올바른 형식입니다.` : 
                        "형식이 올바르지 않습니다."}
                </p>
            )}
        </div>
    {/* ****************************************************************************************************************************************************************** */}
            
    {/*----------------------------------------------------------------------------전화번호-----------------------------------------------------------------------------------------*/}
        <div className="input-value">
            <input type="text" value={memberPhone} 
            onChange={phoneHandleChange} 
            placeholder="전화번호를 입력해주세요." required
            />
        </div>
        {memberPhone && (
                <p
                    style={{
                        color: phoneRegex.test(memberPhone) ? "green" : "red",
                        margin: "0",
                        fontSize: "13px"
                    }}
                >
                    {phoneRegex.test(memberPhone)
                        ? "올바른 형식입니다."
                        : "전화번호 010-****-****"}
                </p>
            )}
    {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
       
     {/* ********************************************************************** 주소 ************************************************************************** */}
        <div className="input-value">
            <AddressSearch onAddressChange={handleAddressChange}/>
        </div>
     {/* ******************************************************************************************************************************************************** */}

     {/* ------------------------------------------------------------------- 이메일 ------------------------------------------------------------------------------ */}
        <div className="input-value">
            <input
                type="text"
                value={memberEmail}
                onChange={emailHandleChange}
                placeholder="이메일을 입력해주세요."
                required
            />
            {memberEmail && (
                <p
                    style={{
                        color: emailRegex.test(memberEmail) ? "green" : "red",
                        margin: "0",
                        fontSize: "13px"
                    }}
                >
                    {emailRegex.test(memberEmail)
                        ? "올바른 형식입니다."
                        : "유효한 이메일 주소를 입력해주세요."}
                </p>
            )}
            <div className="input-value">
            <button className="btn btn-dark" onClick={emailCheck}>이메일 중복 확인</button>
            </div>
        </div>
    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
   
        
        <div className="input-value">
            <button type="submit" className="btn btn-dark" onClick={MemberSignUpButton}>회원가입</button>
<<<<<<< HEAD
=======
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
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        </div>
        
        </div>
        
    )
}
export default MemberSignUp;
