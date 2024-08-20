import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const AdminObo = () => {
  const [oboData, setOboData] = useState([]);

  useEffect(() => {
    axios.get("/api/oboList")
    .then(response => {
      setOboData(response.data);
     console.log("oboData :" ,oboData);
    }) // 가져온 데이터를 oboData 변수에 저장하는 과정
    .catch(e => alert("에러가 발생하였습니다."));
  },[])

  return(
    <div className="container mt-7">
      <h1>1:1 문의목록</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>번호</th>
              <th>작성자</th>
              <th>영화관</th>
              <th>질문유형</th>
              <th>제목</th>
              <th>작성일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {oboData.map(item => (
              <tr key={item.oboNo}>
                <td>{item.oboNo}</td>
                <td>{item.memberName}</td>
                <td>{item.oboMovieType === 'gangnam' ? '강남' : item.oboMovieType === 'yeoksam' ? '역삼' : item.oboMovieType}</td> 
                <td>{item.oboInquiryType === 'general' ? '일반문의' : item.oboInquiryType === 'technical' ? '기술문의' : item.oboInquiryType === 'payment' ? '결제문의' : item.oboInquiryType}</td>
                {/* 제목을 클릭하면 AdminAnswer 페이지로 이동 */}
                <td><Link to={`/AdminAnswer/${item.oboNo}`}>{item.oboTitle}</Link></td>
                <td>{item.oboCreateDate}</td>
                <td>{item.oboStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminObo;
