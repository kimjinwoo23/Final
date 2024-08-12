import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberPasswordFind = () => {
    const [memberId, setMemberId] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [operationKey, setOperationKey] = useState(false);
    const [securityCode, setSecurityCode] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [change, setChange] = useState(false);
    const navigate = useNavigate();


    // 유저가 입력한 이메일로 인증 코드를 보내기 위해 컨트롤러로 사용자 이메일을 보냄
    const sendCode = () => {
        // 이메일이 존재하지 않는다면 출력
        if (!userInfo?.memberEmail) {
            alert("회원 이메일이 없습니다.");
            return;
        }

        fetch("/auth/send-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email: userInfo.memberEmail })
        }) // 컨트롤러에서 제대로 수행하고 반환값이 돌아온다면 출력
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
            alert("인증 코드 발송에 실패하였습니다.");
        });
    }


    // 인증코드 제출버튼 true / false 설정
    const submitSuccess = () => {
        if (!securityCode || !userInfo?.memberEmail) {
            alert("인증 코드를 입력해 주세요.");
            return;
        }

        fetch("/auth/verify-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email: userInfo.memberEmail, code: securityCode })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("인증이 완료되었습니다.");
                navigate('/password-change');
            } else {
                alert("인증 코드가 유효하지 않습니다.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("인증 코드 검증에 실패하였습니다.");
        });
    }

    

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
                        <button onClick={submitSuccess}>인증코드 제출하기</button>
                    </div>)}
                </div>
            </div>)}
        </div>
    );
}

export default MemberPasswordFind;