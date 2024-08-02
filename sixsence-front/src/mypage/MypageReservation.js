import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MypageCss.css";
import elephant from './elephant64.png';

const MypageReservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formDate = `${year}-${month}-${day}`;
    setCurrentDate(formDate);

    axios
      .get("/reservation", {
        params: { memberNo: 1 },
      })
      .then((result) => {
        setReservationList(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log("에러 발생 : ", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="contentMainContainer">
        <div className="outBox">
          <div className="inBox">
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contentMainContainer">
      {reservationList === null ? (
        <div className="outBox">
          <div className="inBox">
            <img src={elephant} alt="코끼리" />
            <p>예매 내역이 존재하지 않습니다.</p>
          </div>
        </div>
      ) : (
        <div className="reservationListBox">
          {reservationList.filter(list => list.moviepayRefund === 'N' && currentDate < list.moviepayViewdate).map((listAfter, index) => (
            <div key={index} className="listBox">
                <div>
                {listAfter.moviepayNo}
                </div>
                <div>영화제목, 총인원수, 좌석 , 결제일자, 관람일자 총가격
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MypageReservation;
