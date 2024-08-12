import { useNavigate } from "react-router-dom";
import React, {useState} from "react";


const MemberPwChange = () => {

    const [memberPw, setMemberPw] = useState("");
    const [memberPwCheck, setMemberPwCheck] = useState("");
    const [change, setChange] = useState(false);
    const pwChangeButton = () => {
        setChange(true);
    }

    return (
        <div className='grop'>

        <div className='input-value'>
        <h1>비밀번호 변경</h1>
        </div>
        
        <div className='input-value'> <h6>고객님의 소중한 정보를 보호하기 위하여 새로운 비밀번호로 변경 후 서비스를 이용해 주세요.</h6></div>
           
       {!change ? (<div className='login-container'>

        <div className="input-value">
        <input
                    type="password"
                    value={memberPw}
                    onChange={(e) => setMemberPw(e.target.value)}
                    placeholder="새 비밀번호를 입력해주세요."
                />
        </div>

        <div className="input-value">
        <input
                    type="password"
                    value={memberPwCheck}
                    onChange={(e) => setMemberPwCheck(e.target.value)}
                    placeholder="새 비밀번호를 재입력해주세요."
                />
        </div>

        <div className="input-value">
        <button className="btn btn-dark" onClick={pwChangeButton}>비밀번호 변경</button>
        </div>
        
        </div>) : 
        (
            <div>
                <div className='input-value'>
                <h2>회원정보가 수정되었습니다.</h2>
                </div>

                <div className="input-value">
                <a href="/main-Home"><button className="btn btn-dark">메인으로 돌아가기</button></a>
               
                <a href="/"><button className="btn btn-dark">My Page</button></a>
                </div>
            </div>
        )}
                

        </div>
    )
}

export default MemberPwChange;