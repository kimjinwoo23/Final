import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const MemberPasswordFind = () => {
    const [memberId, setMemberId] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [operationKey, setOperationKey] = useState(false); // true가 되면 비밀번호 수정화면으로 넘어감
    const [securityCode, setSecurityCode] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [change, setChange] = useState(false);
    const navigate = useNavigate();
    // 미입력 정보 있을 시 출력
    const memberCheck = () => {
        if (!memberId || !memberBirth || !memberPhone) {
            alert("모든 정보를 입력해주세요.");
            return;
        }
        // 사용자에게 아이디, 생일, 폰 정보를 받아서 컨트롤러로 보내는 과정
        fetch("/memberInfo-Find", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ memberId, memberBirth, memberPhone })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("서버 응답이 실패하였습니다.");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
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
    // 유저가 입력한 이메일로 인증 코드를 보내기 위해 컨트롤러로 사용자 이메일을 보냄
    const sendCode = () => {
       console.log(userInfo.memberEmail);
        fetch("/auth/send-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ email: userInfo.memberEmail })
        })
        // 컨트롤러에서 제대로 수행하고 반환값이 돌아온다면 출력
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("인증 코드가 발송되었습니다.");
                setOperationKey(true);
            } else {
                alert("인증 코드 발송에 실패하였습니다.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Fetch error" + error);
        });
    }
    // 인증코드 제출버튼 비어있다면 출력
    const submitSuccess = () => {
        if (!securityCode) {
            alert("인증 코드를 입력해 주세요.");
            return;
        }
        // 인증코드를 제출했을 때 일치하는지 Controller 에서 확인한다.
        fetch("/auth/verify-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                email: userInfo.memberEmail,
                code: securityCode
            })
        })
        .then(response => response.json())
        .then(data => {   // 여기서 data가 가지고 있는 값이 무엇인지 확인해야해
            console.log("data status : " + data.status);
            if (data.status === "success") {
                alert("인증이 완료되었습니다.");
                navigate('/passwordChange', { state: { data: data } });
            } else {
                alert("인증 코드가 유효하지 않습니다.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("인증 코드 검증에 실패하였습니다.");
        });
    }
    return (
        <div className='group'>
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
                    <h6>비밀번호가 기억나지 않으세요? 인증을 통해 계정 비밀번호를 수정하고 로그인하세요.</h6>
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
                            placeholder="법정생년월일 8자리를 입력해주세요. 예:(YYYY-MM-DD)"
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
                        <button className="btn btn-dark" onClick={memberCheck}>회원 정보 확인</button>
                    </div>
                </div>
            </div>)
            :
            (<div>
                <div className='login-container'>
                    <h3>등록된 정보를 통한 이메일로 임시 비밀번호를 발송합니다.</h3>
                    <div className="input-value">
                        <h3>{userInfo.memberName}님!</h3>
                        <h6>인증받을 본인의 이메일을 확인해주세요.</h6>
                        <div className="input-value">
                            <h3>{userInfo.memberEmail}</h3>
                        </div>
                    </div>
                    {!operationKey ?
                    (<div className="input-value">
                        <button className="btn btn-dark" onClick={sendCode}>인증코드 발송</button>
                    </div>)
                    :
                    (<div>
                        <input type="text" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} placeholder="인증코드를 입력해주세요."/>
                        <br/>
                        <button className="btn btn-dark" onClick={submitSuccess}>인증코드 제출하기</button>
                    </div>)}
                </div>
            </div>)}
        </div>
    );
}
export default MemberPasswordFind;