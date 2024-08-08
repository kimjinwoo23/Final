import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/CustomerBoard.css';

const CustomerBoard = ({ isAdmin }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get("/api/board")
      .then(response => {
        console.log(response);
        setData(response.data);
      })      
      .catch(error => {
        console.error('Error', error);
      });
  }, []);

  //페이지 번호를 변경하는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //조회 수를 증가시크는 함수
const incrementViewCount = (postNo) => {
    setData(prevData =>
      prevData.map(item =>
        item.post_no === postNo ? { ...item, post_count: item.post_count + 1 } : item
      )
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = data.filter(item => 
    item.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

  return (
    <div className='container mt-4'>
      <h2 className='text-center mb-4'>공지사항</h2>
      <div className='top-bar'>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearch}
          className="search-box"
        />
        {isAdmin && (
          <Link to="/noticeWrite" className='btn btn-primary write-button'>글쓰기</Link>
        )}
      </div>
      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.postNo} onClick={() => incrementViewCount(item.postNo)}>
                <td>{item.postNo}</td>
                <td>
                  <Link to={`/NoticeView/${item.postNo}`}>{item.postTitle}</Link>
                </td>
                <td>{item.postCount}</td>
                <td>{item.postCreateDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemPerPage={itemPerPage}
        totalItems={filteredItems.length}
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
            <a onClick={(e) => {e.preventDefault(); paginate(number);}} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomerBoard;
