import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MypageCss.css";
import elephant from "./images/elephant64.png";

const MypageReservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formDate = `${year}-${month}-${day}`;
    const formTime = `${hours}:${minutes}:${seconds}`;
    setCurrentDate(formDate);
    setCurrentTime(formTime);

    axios.get("/getMovieAll")
      .then(result => {
        setMovieList(result.data.result);
      })

    axios
      .get("/reservation", {
        params: { memberNo: 1 }, // 나중에 유저정보로 가져와야하는 부분
      })
      .then((result) => {
        setReservationList(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log("에러 발생 : ", err);
      });
  }, []);

  const checkButton = () => {
    console.log("버튼 눌림");
  }

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
          {reservationList
            .filter(
              (list) =>
                list.moviepayRefund === "N" &&
                (currentDate < list.moviepayViewdate
                  ? true
                  : currentTime < list.moviepayViewtime
                  ? true
                  : false)
            )
            .map((listAfter, index) => (
              <div key={index} className="listBox">
                <div className="area1">
                  <small>예매번호</small> <br />
                  {listAfter.moviepayNo} <br />
                  <small>{`(${listAfter.moviepayPaydate})`}</small>
                </div>
                <div className="area2">
                  <img src={`${movieList[listAfter.movieNo-1].movieImage}`} />
                </div>
                <div className="area3">
                  <b className="movieTitle">{movieList[listAfter.movieNo-1].movieTitle}</b> <br/>
                  <b>관람 극장 &nbsp;:&nbsp;</b> Sixsence&nbsp;{listAfter.moviepayViewregion}점 <br/> 
                  <b>관람 일자 &nbsp;:&nbsp;</b> {listAfter.moviepayViewdate.replaceAll("-",".")}&nbsp;{listAfter.moviepayViewtime.substring(0,5)}<br/> 
                  <b>관람 좌석 &nbsp;:&nbsp;</b> {listAfter.moviepaySeat}<br/> 
                  <b>총 인원수 &nbsp;:&nbsp;</b> {listAfter.moviepayAdult+listAfter.moviepayChild}&nbsp;{`(성인 : ${listAfter.moviepayAdult}, 청소년 : ${listAfter.moviepayChild})`}<br/> 
                </div>
                <div className="area4">
                  <b>총 가격 &nbsp;:&nbsp;</b> {(listAfter.moviepayAdult*10000)+(listAfter.moviepayChild*8000)} 원
                  <button onClick={e => checkButton()}>예매 취소</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MypageReservation;
