import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
const MemberPasswordFind = () => {

    const [memberId, setMemberId] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [operationKey, setOperationKey] = useState(false); // 인증 통과 여부 버튼 true, false 확인
    const [securityCode, setSecurityCode] = useState(""); // 사용자가 입력하는 인증코드 
    const [userInfo, setUserInfo] = useState(null);
    const [change, setChange] = useState(false);
    const navigate = useNavigate();

    const sendCode = () => {
        setOperationKey(true);
    }

    const submitSuccess = () => {
        alert("인증이 완료되었습니다.");
        navigate('/password-change');
    }

    const memberCheck = () => {

    if (!memberId || !memberBirth || !memberPhone) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    fetch("/memberInfo-Find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ memberId, memberBirth, memberPhone })
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
        
        if (data){
            setUserInfo(data);
            alert("회원 정보를 조회하고 있습니다.");
            setChange(true);
        } else {
            alert("일치하는 정보가 없습니다.");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("일치하는 정보가 없습니다.");
    });

    }

    return (

        <div className='grop'>
        {!change ? 
        (<div>
        <div className='input-value'>
        <h1>비밀번호 찾기</h1>
        </div>
        
        <div className='input-value'>
        <h6>비밀번호가 기억나지 않으세요? 원하시는 방법을 선택해 비밀번호를 확인하실 수 있습니다.</h6>
        </div>
        </div>) 
           : 
        (<div>
        <div className='input-value'>
        <h1>비밀번호 확인</h1>
        </div>
        
        <div className='input-value'>
        <h6>비밀번호가 기억나지 않으세요? 임시비밀번호를 발급받아 해결해 보세요.</h6>
        </div>
        </div>) }
       
        {!change ? 
        (<div>
            <div className='login-container'>

        <h2>회원 정보</h2>
        <h5>입력하신 정보는 임시비밀번호 발급에만 사용되며 저장되지 않습니다.</h5>

        <div className="input-value">
        <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="아이디를 입력해주세요."
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
        <button className="btn btn-dark" onClick={memberCheck}>회원 정보 확인</button>
        </div>

        </div>
        </div>) 

           : 
           
        (<div>
           <div className='login-container'>

        <h2>등록된 정보를 통한 이메일로 임시 비밀번호를 발송합니다.</h2>

        <div className="input-value">
            <h3>{userInfo.memberName}님!</h3> <h6>인증받을 본인의 이메일을 확인해주세요.</h6>
            <div className="input-value">
            <h3>{userInfo.memberEmail}</h3>
            </div>
        </div>

        {/* {isCorrect ? (<Link to = '/ttt-twoStep'><button className='nextStep-button'>다음단계로이동</button></Link>) 
                                            : 
        (<button onClick={handleRestart} className='restart-button'>게임재시작</button>)} */}

        {!operationKey ? (<div className="input-value">
        <button className="btn btn-dark" onClick={sendCode}>인증코드 발송</button>
        </div> ) : (
            <div>
            <input type="text" value={securityCode} onChange={(e) => {setSecurityCode(e.target.value)}} placeholder="인증코드를 입력해주세요."/>
            <br/>
            <button onClick={submitSuccess}>인증코드 제출하기</button>
            </div>
            )}


        </div> 
        </div>)}
        

        </div>
    )
}

export default MemberPasswordFind;