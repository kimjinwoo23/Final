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
    // 테스트를 위한 임시 데이터
    /*const testData = [
      { post_no: 1, post_title: '공지사항 1', post_content: '내용 1', post_count: 10, post_createDate: '2023-01-01' },
      { post_no: 2, post_title: '공지사항 2', post_content: '내용 2', post_count: 20, post_createDate: '2023-01-02' },
      { post_no: 3, post_title: '공지사항 3', post_content: '내용 3', post_count: 30, post_createDate: '2023-01-03' },
      { post_no: 4, post_title: '공지사항 4', post_content: '내용 4', post_count: 40, post_createDate: '2023-01-04' },
      // 추가 데이터...
    ];
    setData(testData);

     
        */

    // 실제 데이터를 불러오는 코드 (주석처리)
    //자바 컨트롤러에 데이터 전송 ! Post
    
      axios.get("/api/board")
      .then(response => {
        console.log(response);
        setData(response.data);
      })      
  }, []);
   
  
 

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  //const currentItems = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <th>내용</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
         <tbody>
          {/* filteredItems.slice(firstItemIndex, lastItemIndex) */}
            {data.map(item => (
              <tr key={item.postNo} onClick={() => incrementViewCount(item.post_no)}>
                <td>{item.postNo}</td>
                <td>
                  <Link to={`/customerView/${item.postNo}`}>{item.postTitle}</Link>
                </td>
                <td>{item.postContent}</td>
                <td>{item.postCount}</td>
                <td>{item.postCreateDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemPerPage={itemPerPage}
        //totalItems={filteredItems.length}
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
      <ul className='pagination justify-content-center'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomerBoard;