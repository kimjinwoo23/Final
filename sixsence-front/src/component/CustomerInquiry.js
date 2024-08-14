import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/CustomerInquiry.css';

const CustomerInquiry = () => {
  const { loginMember, setLoginMember } = useState({memberName:'',memberPhone:'',memberEmail:''});
  const [memberNo, sestMemberNo] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberEmail, setMemberEmail] = useState('');

  const [oboTitle, setOboTitle] = useState('');
  const [oboContent, setOboContent] = useState('');
  const [inquiryType, setInquiryType] = useState('general');

  const navigate = useNavigate('');

  useEffect(() => {
    axios.get("/api/getMember")
     .then(response => {
      setLoginMember({
        memberName : response.data.memberName,
        memberPhone : response.data.memberPhone,
        memberEmail : response.data.memberEmail,
      });
     })
     .catch(error => {
      console.error("에러가발생했어요!!", error);
     });
  },[]);

   const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    const inquiryData = {
      memberNo : memberNo, //회원번호
      memberName : memberName,
      memberPhone : memberPhone,
      memberEmail : memberEmail, //회원 이메일
      oboTitle : oboTitle, //문의제목
      oboContent : oboContent, //문의내용
      oboCreateDate: new Date(), // 생성 날짜
    }
    axios.post("api/submitInquiry" ,inquiryData)
    .then(response => {
      alert("문의가 제출되었습니다.");
      navigate("/MypageObo");
    })
    .catch(error => {
      alert("문의 제출이 실패되었습니다");
      console.error("에러발생",error);
    })
  };
   
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">1:1문의</h2>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inquiryType" className="col-sm-2 col-form-label">문의유형</label>
          <div className="col-sm-10">
            <select className="form-control" id="inquiryType" value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}>
              <option value="general">일반문의</option>
              <option value="technical">기술문의</option>
              <option value="billing">결제문의</option>
            </select>
          </div>
        </div>
          {/*불러와지는 항목 */}
      <div className="form-group row">
        <label htmlFor="userName" className="col-sm-2 col-form-label">이름</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="userName"
           value={memberName} readOnly />
        </div>
        </div>
       
        <div className="form-group row">
        <label htmlFor="userPhone" className="col-sm-2 col-form-label">연락처</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="userPhone"
           value={memberPhone} readOnly />
        </div>
        </div>

        <div className="form-group row">
        <label htmlFor="userEmail" className="col-sm-2 col-form-label">이메일</label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="userEmail"
           value={memberEmail} readOnly />
        </div>
        </div>
         {/*제목과 내용 */}
        <div className="form-group row">
        <label htmlFor="inquiryTitle" className="col-sm-2 col-form-label">제목</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inquiryTitle"
           value={oboTitle} onChange={(e) =>setOboTitle(e.target.value)}
           placeholder="제목을 입력하세요" />
        </div>
        </div>

        <div className="form-group row">
        <label htmlFor="inquiryContent" className="col-sm-2 col-form-label">내용</label>
        <div className="col-sm-10">
          <textarea type="text" className="form-control" id="inquiryContent"
           value={memberName} onChange={(e) => setOboContent(e.target.value)}
           placeholder="내용을 입력하세요" />
        </div>
        </div>
        <div className="col-sm-10 offset-sm-2">
          <button type="submit" className="obobtn">제출하기</button>
        </div>
      </form>
     </div>
   );
};

export default CustomerInquiry;