import React, {useState} from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
const MemberIdFind = () => {
    const [memberName, setMemberName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [change, setChange] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin
    
    // 정규식 
    const nameRegex = /^[가-힣]{2,10}$|^[a-zA-Z\s\-]{2,20}$/;
    const birthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const phoneRegex = /^(010-\d{4}-\d{4}|02-\d{3,4}-\d{4}|\d{3}-\d{3,4}-\d{4})$/;

<<<<<<< HEAD
=======
    // 이름 정규식에서 한글 : 영어 구분
    const [inputType, setInputType] = useState("none");
    // 정규식
    const nameRegex = /^[가-힣]{2,10}$|^[a-zA-Z\s\-]{2,20}$/;
    const birthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const phoneRegex = /^(010-\d{4}-\d{4}|02-\d{3,4}-\d{4}|\d{3}-\d{3,4}-\d{4})$/;
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
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
       // 전화번호 형식 지정
       const formatPhoneNumber = (value) => {
        // 숫자만 !!
        const cleanedPhone = value.replace(/\D/g, '');
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        // 전화번호 형식에 맞게 명령
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

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
    // 전화번호 핸들러
    const phoneHandleChange = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setMemberPhone(formattedPhoneNumber);
    };
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
    // 생년월일 형식 지정
    const formatBirthDate = (value) => {
        // 숫자만 추출
        const cleanedBirth = value.replace(/\D/g, '');
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
        // 날짜 형식에 맞게 포맷팅
        if (cleanedBirth.length <= 4) {
            return cleanedBirth;
        }
        if (cleanedBirth.length <= 6) {
            return `${cleanedBirth.slice(0, 4)}-${cleanedBirth.slice(4)}`;
        }
        return `${cleanedBirth.slice(0, 4)}-${cleanedBirth.slice(4, 6)}-${cleanedBirth.slice(6, 8)}`;
    };
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
     // 생년월일 핸들러
     const birthHandleChange = (e) => {
        const formattedDate = formatBirthDate(e.target.value);
        setMemberBirth(formattedDate);
    };
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
    const idFind = () => {
        if (!memberName || !memberBirth || !memberPhone) {
            alert("필수 정보를 입력해주세요.");
            return;
        }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
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
<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> jinhwa2-board
=======


>>>>>>> jin
        fetch("/memberId-Find", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ memberName, memberBirth, memberPhone })
        })
        .then(response => {
            console.log(response);
            console.log("response : " , response.status);
            if (!response.ok) {
                throw new Error("서버 응답이 실패하였습니다.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // if (data && data.memberId) {
            if (data){
                setUserInfo(data);
                alert("입력하신 정보와 일치하는 아이디를 찾았습니다.");
                setChange(true);
            } else {
                alert("일치하는 정보가 없습니다.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("일치하는 정보가 없습니다.");
        });
    };
    return (
        <div className='grop'>
        {!change ? (
            <div className="title-box">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> jin

            <h1>아이디 찾기</h1>
           
            <h6>아이디가 기억나지 않으세요? 원하시는 방법을 선택해 아이디를  확인하실 수 있습니다.</h6>
           
<<<<<<< HEAD
=======
            <h1>아이디 찾기</h1>
            <h6>아이디가 기억나지 않으세요? 원하시는 방법을 선택해 아이디를  확인하실 수 있습니다.</h6>
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
            </div>
        ) : (
        <div>

        <div className='input-value'>
        <h1>아이디 확인</h1>
        </div>
        <div className='input-value'>
        <h6>입력하신 정보와 일치하는 아이디는 다음과 같습니다.</h6>
        </div>
        </div>
        )}
        {!change ? (
            <div className='login-container'>
            <div className="input-value">
            <input
                        type="text"
                        value={memberName}
<<<<<<< HEAD
<<<<<<< HEAD
                        onChange={(e) => {setMemberName(e.target.value)}}
=======
                        onChange={nameHandleChange}
>>>>>>> jinhwa2-board
=======
                        onChange={(e) => {setMemberName(e.target.value)}}
>>>>>>> jin
                        placeholder="이름을 입력해주세요."
                        required
                    />
            </div>
<<<<<<< HEAD
<<<<<<< HEAD

=======
            <div className="input-value">
                <p style={{ color:"red",margin : "0",fontSize:"13px"}}>{inputType === "korean" ?
                "한글만 입력할 수 있습니다." :
                inputType === "english" ? "영어만 입력할 수 있습니다." : "입력 타입을 선택해 주세요."}</p>
            </div>
>>>>>>> jinhwa2-board
=======
>>>>>>> jin
            <div className="input-value">
            <input
                        type="text"
                        value={memberBirth}
                        onChange={birthHandleChange}
                        placeholder="법정생년월일 8자리를 입력해주세요. 예:(YYYY-MM-DD)"
                        maxLength="10" // 최대 길이를 10으로 설정 (예: YYYY-MM-DD) 더 이상 입력할 수 없게
<<<<<<< HEAD
<<<<<<< HEAD
                        required
=======
>>>>>>> jinhwa2-board
=======
                        required
>>>>>>> jin
                    />
            </div>
            <div className="input-value">
            <input
                        type="text"
                        value={memberPhone}
                        onChange={phoneHandleChange}
                        placeholder="전화번호를 입력해주세요."
<<<<<<< HEAD
<<<<<<< HEAD
                        required
=======
>>>>>>> jinhwa2-board
=======
                        required
>>>>>>> jin
                    />
            </div>
            <div className="input-value">
            <button className="btn btn-dark" onClick={idFind}>아이디 찾기</button>
            </div>
            </div>
        ) : (
            <div>
        <div className='login-container'>
        <h2>{userInfo.memberName} 님의 아이디는 {userInfo.memberId} 입니다.</h2>
        <div className="input-value">
        </div>
        <div className="input-value">
        <Link to="/memberLogin"><button className="btn btn-dark">로그인</button></Link>
        </div>
        <div className="input-value">
        <Link to="/passwordFind"><button className="btn btn-dark">비밀번호 찾기</button></Link>
        </div>
        </div>
        </div>
        )}
        </div>
    )
}
export default MemberIdFind;