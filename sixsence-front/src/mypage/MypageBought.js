import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MypageCss.css";
import dog from "./images/buyDog.png";
import alpaca from "./images/alpacaIcon.png";
import loadingIcon from "./images/loadingIcon.gif";

const MypageBought = () => {
  const [boughtList, setboughtList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [itempayList, setItempayList] = useState([]);

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

    getItempayList();
    getMovieList();
    getboughtList();
  }, []);

  const getItempayList = () => {
    axios.get("/getItempayList?memberNo="+1)
    .then(result => {
        console.log(result.data);
        setItempayList(result.data);
    })
  }

  const getMovieList = () => {
    axios.get("/getMovieAll").then((result) => {
      setMovieList(result.data.result);
    });
  };

  const getboughtList = () => {
    setLoading(true);

    axios
      .get("/getMovieList", {
        params: { memberNo: 1 }, // 나중에 유저정보로 가져와야하는 부분
      })
      .then((result) => {
        setboughtList(result.data.result);
        setTimeout(function () {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log("에러 발생 : ", err);
      });
  };

  const boughtFilter = () => {
    const listFilter = boughtList.filter(
      (list) =>
        list.moviepayRefund === "N" &&
        (currentDate > list.moviepayViewdate
          ? true
          : currentDate === list.moviepayViewdate
          ? currentTime > list.moviepayViewtime
            ? true
            : false
          : false)
    );
    return listFilter;
  };

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
    <div className="boughtContainer">
      <div className="contentContainer">
        <h2>영화 구매 내역</h2>
        {boughtList === null || boughtFilter().length === 0 ? (
          <div className="outBox">
            <div className="inBox">
              <img src={dog} alt="강아지" />
              <p>구매 내역이 존재하지 않습니다.</p>
            </div>
          </div>
        ) : (
          <div className="boughtListBox">
            {boughtFilter().map((listAfter) => (
              <div key={listAfter.moviepayNo} className="listBox">
                <div className="area1">
                  <small>결제번호</small> <br />
                  {listAfter.moviepayNo} <br />
                  <small>{`(${listAfter.moviepayPaydate})`}</small>
                </div>
                <div className="area2">
                  <img
                    src={`${movieList[listAfter.movieNo - 1].movieImage}`}
                    alt="영화포스터"
                  />
                </div>
                <div className="area3">
                  <b className="movieTitle">
                    {movieList[listAfter.movieNo - 1].movieTitle}
                  </b>{" "}
                  <br />
                  <b>관람 극장 &nbsp;:&nbsp;</b> Sixsence&nbsp;
                  {listAfter.moviepayViewregion}점 <br />
                  <b>관람 일자 &nbsp;:&nbsp;</b>{" "}
                  {listAfter.moviepayViewdate.replaceAll("-", ".")}&nbsp;
                  {listAfter.moviepayViewtime.substring(0, 5)}
                  <br />
                  <b>관람 좌석 &nbsp;:&nbsp;</b> {listAfter.moviepaySeat}
                  <br />
                  <b>총 인원수 &nbsp;:&nbsp;</b>{" "}
                  {listAfter.moviepayAdult + listAfter.moviepayChild}&nbsp;
                  {`(성인 : ${listAfter.moviepayAdult}, 청소년 : ${listAfter.moviepayChild})`}
                  <br />
                </div>
                <div className="area4">
                  <b>총 가격 &nbsp;:&nbsp;</b><br/>
                  {listAfter.moviepayAdult * 100 +
                    listAfter.moviepayChild * 100}{" "}
                  원
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="contentContainer">
        <h2>상품 구매 내역</h2>
        {boughtList === null || boughtFilter().length === 0 ? (
          <div className="outBox">
            <div className="inBox">
              <img src={alpaca} alt="알파카" />
              <p>구매 내역이 존재하지 않습니다.</p>
            </div>
          </div>
        ) : (
          <div className="boughtListBox">
            {boughtFilter().map((listAfter) => (
              <div key={listAfter.moviepayNo} className="listBox">
                <div className="area1">
                  <small>결제번호</small> <br />
                  {listAfter.moviepayNo} <br />
                  <small>{`(${listAfter.moviepayPaydate})`}</small>
                </div>
                <div className="area2">
                  <img
                    src={`${movieList[listAfter.movieNo - 1].movieImage}`}
                    alt="영화포스터"
                  />
                </div>
                <div className="area3">
                  <b className="movieTitle">
                    {movieList[listAfter.movieNo - 1].movieTitle}
                  </b>{" "}
                  <br />
                  <b>관람 극장 &nbsp;:&nbsp;</b> Sixsence&nbsp;
                  {listAfter.moviepayViewregion}점 <br />
                  <b>관람 일자 &nbsp;:&nbsp;</b>{" "}
                  {listAfter.moviepayViewdate.replaceAll("-", ".")}&nbsp;
                  {listAfter.moviepayViewtime.substring(0, 5)}
                  <br />
                  <b>관람 좌석 &nbsp;:&nbsp;</b> {listAfter.moviepaySeat}
                  <br />
                  <b>총 인원수 &nbsp;:&nbsp;</b>{" "}
                  {listAfter.moviepayAdult + listAfter.moviepayChild}&nbsp;
                  {`(성인 : ${listAfter.moviepayAdult}, 청소년 : ${listAfter.moviepayChild})`}
                  <br />
                </div>
                <div className="area4">
                  <b>총 가격 &nbsp;:&nbsp;</b>{" "}
                  {listAfter.moviepayAdult * 100 +
                    listAfter.moviepayChild * 100}{" "}
                  원
                  <p>상품명, 상품이미지, 결제일, 총가격, 수량, 구매자 이름, 이메일, 영수증 번호</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MypageBought;
