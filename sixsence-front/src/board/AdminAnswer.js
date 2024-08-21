import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import '../css/AdminAnswer.css';

const AdminAnswer = () => {
   const { oboNo } = useParams();
   const [obo, setObo] = useState(null);
   const [oboAnswer, setOboAnswer] = useState('');
   const [isAnswering, setIsAnswering] = useState(false);  // 답변 작성 모드 확인
   const navigate = useNavigate();

   useEffect(() => {
    axios.get(`/api/oboList/${oboNo}`)
    .then(response => {
      setObo(response.data);
    })
    .catch(e=> alert("불러오는데 문제가 발생했습니다."));
   } ,[oboNo]);

   const handleAnswerSubmit = () => {
     const answerData = {
       ...obo,  // 기존 문의 데이터
       oboAnswer: oboAnswer,  // 답변 내용
       oboStatus: 'y'  // 상태를 'y'로 변경
     };

     axios.post("/api/registerAnswer", answerData)
     .then(response => {
       alert("답변이 등록되었습니다.");
       navigate("/AdminObo");  // 답변 등록 후 목록으로 이동
     })
     .catch(error => {
       alert("답변 등록이 실패했습니다.");
       console.error("에러발생", error);
     });
   };

   const oboDelete = () => {
     axios.delete(`/obo/${oboNo}`)
     .then(response => {
      setObo(response.data);
     })
     .catch(e => alert("에러가 발생하였습니다."))
     }

   return(
    <div className="admin-answer-container">
    {obo ? (
      <>
        <p>작성자: {obo.memberName}</p>
        <p>제목: {obo.oboTitle}</p>
        <p>내용: {obo.oboContent}</p>
        {isAnswering ? (
          <>
            <textarea className='content_txt1'
              type="text" 
              value={oboAnswer} 
              onChange={(e) => setOboAnswer(e.target.value)}
              placeholder="문의내용 답변작성" 
            />
            <button className='admin-butt' onClick={handleAnswerSubmit}>답변 제출</button>
          </>
        ) : (
          <button  onClick={() => setIsAnswering(true)}>답변하기</button>
         
        )}
       &nbsp;&nbsp; <button onClick={oboDelete}>삭제하기</button>
      </>
    ) : (
      <p>로딩 중...</p>
    )}
  </div>
   )
};

export default AdminAnswer;
