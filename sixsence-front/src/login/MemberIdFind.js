import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";

const MemberIdFind = () => {

    const [memberName, setMemberName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    const [change, setChange] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const idFind = () => {

        if (!memberName || !memberBirth || !memberPhone) {
            alert("모든 정보를 입력해주세요.");
            return;
        }

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
            <div>
            <div className='input-value'>
            <h1>아이디 찾기</h1>
            </div>
            
            <div className='input-value'>
            <h6>아이디가 기억나지 않으세요? 원하시는 방법을 선택해 아이디를  확인하실 수 있습니다.</h6>
            </div>
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
                        placeholder="전화번호를 뒤 7~8 자리를 입력해주세요. (01X 제외)"
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
        <Link to="/member-login"><button className="btn btn-dark">로그인</button></Link>
        </div>

        <div className="input-value">
        <Link to="/password-Find"><button>비밀번호 찾기</button></Link>
        </div>
        
        </div>
        </div>
        )}
        
        </div>
    )
}

export default MemberIdFind;