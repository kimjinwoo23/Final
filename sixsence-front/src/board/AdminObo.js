import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../css/AdminObo.css';

const AdminObo = () => {
  const [oboData, setOboData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  useEffect(() => {
    axios.get("/api/oboList")
      .then(response => {
        setOboData(response.data);
      })
      .catch(e => alert("에러가 발생하였습니다."));
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentItems = oboData.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="container-admin">
      <div className="admin-button">
        <Link to="/CustomerBoard">돌아가기</Link>
      </div>
      <div className="admin-table-responsive">
        <table>
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
            {currentItems.map(item => (
              <tr key={item.oboNo}>
                <td>{item.oboNo}</td>
                <td>{item.memberName}</td>
                <td>{item.oboMovieType === 'gangnam' ? '강남' : item.oboMovieType === 'yeoksam' ? '역삼' : item.oboMovieType}</td>
                <td>{item.oboInquiryType === 'general' ? '일반문의' : item.oboInquiryType === 'technical' ? '기술문의' : item.oboInquiryType === 'payment' ? '결제문의' : item.oboInquiryType}</td>
                <td><Link to={`/AdminAnswer/${item.oboNo}`}>{item.oboTitle}</Link></td>
                <td>{item.oboCreateDate}</td>
                <td>{item.oboStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemPerPage={itemPerPage}
        totalItems={oboData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ itemPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={(e) => { e.preventDefault(); paginate(number); }} href="!#" className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminObo;
