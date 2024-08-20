import React, {useEffect, useState} from "react";
import axios from 'axios';
import loadingIcon from "./images/loadingIcon.gif";
import chicken2 from "./images/chicken2icon.png";
import "./MypageCss.css";
import {useNavigate} from 'react-router-dom';

const MypageObo = () => {
    const loginMember = JSON.parse(localStorage.getItem("loginMember"));
    const [oboList, setOboList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navi = useNavigate();

    useEffect(()=> {
        axios.get('/getMemberObo', {params: {memberNo: loginMember.memberNo}})
        .then(response => {
            setOboList(response.data);
            setTimeout(function () {
                setLoading(false);
            }, 1000);
        })
        .catch(error => {
            console.log(error);
            alert("1:1 문의 내역을 불러오던 중 에러가 발생했습니다.\n다시 시도해주세요.");
        })
    }, [])

    const registObo = () => {
        navi('/CustomerObo');
    }

    if (loading) {
        return (
          <div className="contentMainContainer">
            <div className="outBox">
              <div className="inBox">
                <img src={loadingIcon} alt="로딩" />
                <p>로딩 중...</p>
              </div>
            </div>
          </div>
        );
      }

    return (
        <div className="contentMainContainer">
        {oboList === null || oboList.length === 0 ? (
          <div className="outBox">
            <div className="inBox">
              <img src={chicken2} alt="닭2" />
              <p>1:1 문의 내역이 존재하지 않습니다.</p>
            </div>
          </div>
        ) : (
          <div className="oboListbox">
            <div className="oboCategory">
                <hr />
                    <div className="oboCategoryBox">
                        <div className="oboCol1"><b><p>번호</p></b></div>
                        <div className="oboCol2"><b><p>유형</p></b></div>
                        <div className="oboCol3"><b><p>영화관</p></b></div>
                        <div className="oboCol4 oboCol4Title"><b><p>제목</p></b></div>
                        <div className="oboCol5"><b><p>작성일</p></b></div>
                        <div className="oboCol6"><b><p>상태</p></b></div>
                    </div>
                <hr />
            </div>
            {oboList.map((list, index) => (
                <div key={list.oboNo}>
                    <div className="listBox">
                        <div className="oboCol1">
                            {oboList.length - index}
                        </div>
                        <div className="oboCol2">
                            {list.oboInquiryType === 'general' ? '일반': (list.oboInquiryType === 'technical' ? '기술' : '결제')}
                        </div>
                        <div className="oboCol3">
                            {list.oboMovieType === 'gangnam' ? '강남점':'역삼점'}
                        </div>
                        <div className="oboCol4">
                            {list.oboTitle}
                        </div>
                        <div className="oboCol5">
                            {list.oboCreateDate.replaceAll('-','.')}
                        </div>
                        <div className="oboCol6">
                            {list.oboStatus === 'n' ? '답변중':'답변완료'}
                        </div>
                    </div>
                    <hr/>
                </div>
            ))}
          </div>
        )}
        <button className="oboBtn" onClick={registObo}>문의 등록</button>
      </div>
  );
};

export default MypageObo;
