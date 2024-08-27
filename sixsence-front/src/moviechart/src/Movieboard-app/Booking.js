import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";
import axios from "axios";
import LoginContext from "../../../login/LoginContext.js";
<<<<<<< HEAD
import  "react-calendar";
=======
import "react-calendar";
>>>>>>> wongi11
import Calendar from "react-calendar";

const Booking = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");
  const [movies, setMovies] = useState([]);
<<<<<<< HEAD
  const [selectedMovie, setSelectedMovie] = useState(null); // 영화선택
  const [selectedSeat, setSelectedSeat] = useState([]); // 좌석 선택
  const [numPeople, setNumPeople] = useState(1); // 사람 선택 최소 1명부터 시작
  const [selectedRegion, setSelectedRegion] = useState(null); // 강남, 역삼 지역 선택
  const [selectedDate, setSelectedDate] = useState(null); // 날짜 선택 
  const [selectedTime, setSelectedTime] = useState(null); // 시간대선택
  const [adultTickets, setAdultTickets] = useState(null); // 일반
  const [childTickets, setChildTickets] = useState(null); // 청소년
  const [totalPoints, setTotalPoints] = useState(0); // 적립될 총 포인트
  const [usePoints, setUsePoints] = useState(0); // 사용한 포인트
  const [usingPoints, setUsingPoints] = useState(false); // 사용할 수 있는 포인트
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate(); // navigate : 특정 행동을 했을 때 해당 주소로 이동해줄 수 있게 만들어주는 함수
  const [loginin , setLoginIn] = useState(false); 
  const Pointsheld = loginMember ? loginMember.memberPoint : 0;
  const buttons = document.querySelectorAll('.step-button'); // css에서 .step-button 계속 활성화


  buttons.forEach(button => {
    button.addEventListener('click' , () => {
      buttons.forEach(btn => btn.classList.remove('selected')); // 모든 버튼에서 'selected' 클래스 제거
      button.classList.add('selected'); // 클릭된 버튼에 selected 클래스 추가
    });
  });
  
=======
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [selectedandSeat, setSelectedandSeat] = useState([]);
  const [numPeople, setNumPeople] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [adultTickets, setAdultTickets] = useState(null);
  const [childTickets, setChildTickets] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(0);
  const [usingPoints, setUsingPoints] = useState(false);
  const [userPoints, setUserPoints] = useState("0");
  const navigate = useNavigate();
  const [loginin, setLoginIn] = useState(false);
  const Pointsheld = loginMember ? loginMember.memberPoint : 0;
  const [movieNo, setMovieNo] = useState(null);
>>>>>>> wongi11

  const MTDate = new Date();
  const MTHours = MTDate.getHours();
  const MTMinutes = MTDate.getMinutes();

  const isTimePassed = (hour, minute) => {
    if (!selectedDate) return false;
    if (
      selectedDate.getFullYear() === MTDate.getFullYear() &&
      selectedDate.getMonth() === MTDate.getMonth() &&
      selectedDate.getDate() === MTDate.getDate()
    ) {
      return hour < MTHours || (hour === MTHours && minute < MTMinutes);
    }
    return false;
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const formatDate = () => {
    if (!selectedDate) {
      console.error(
        "selectedDate is null or undefined, using current date as fallback"
      );
      return new Date().toISOString().slice(0, 10);
    }
    return selectedDate.toISOString().slice(0, 10);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("loginMember", JSON.stringify(userData));
    setLoginIn(true);
  };

  useEffect(() => {
    const saveMember = localStorage.getItem("loginMember");
    if (saveMember) {
      setLoginMember(JSON.parse(saveMember));
      setLoginIn(true);
    } else {
      setLoginIn(false);
    }
  }, [setLoginMember]);

  useEffect(() => {
    const viewpoint = async () => {
      try {
        const response = await axios.get(
          `http://localhost:666/moviepay/points/${loginMember.memberNo}`
        );
        setUserPoints(response.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    if (loginMember) {
      viewpoint();
    }
  }, [loginMember]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:666/moviepay/movies"
        );
        setMovies(response.data);
        if (movieId) {
          const movie = response.data.find(
            (m) => m.movieNo === parseInt(movieId)
          );
          setSelectedMovie(movie);
        }
      } catch (err) {
        console.error("Error loading movie data: ", err);
      }
    };
    fetchMovies();
  }, [movieId]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setMovieNo(movie.movieNo);
    setSelectedTime(null); // 영화 변경 시 시간 초기화
    console.log("영화 제대로 불러와지는지 확인", movie.movieNo);
  };

  const handleSeatClick = (seat) => {
    if (selectedSeat.includes(seat)) {
      setSelectedSeat(selectedSeat.filter((s) => s !== seat));
    } else if (selectedSeat.length < adultTickets + childTickets) {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };

  useEffect(() => {
    const fetchAndSetSeats = async () => {
      if (movieNo && selectedTime) {
        try {
          const response = await fetch(
            `http://localhost:666/moviepay/movieSeat/${movieNo}?time=${selectedTime}`
          );
          const data = await response.json();

          //좌석 데이터를 배열로 변환 (이 코드로 좌석 예매된거 표시 해결)
          const parseData = data[0] ? data[0].split(',').map(seat => seat.trim()) : [];
          console.log("좌석데이터", parseData);
          
          setSelectedandSeat(parseData); // 이미 예약된 좌석을 비활성 상태로 설정
        } catch (error) {
          console.error("좌석 에러 :", error);
        }
      } else {
        console.error("값이 누락되었습니다");
      }
    };
    
    fetchAndSetSeats();
}, [movieNo, selectedTime]);


   

  const handleNumPeopleChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 4) {
      setNumPeople(value);
      setSelectedSeat([]);
    }
  };

  const getPosterPath = (movie) => {
    return `${process.env.PUBLIC_URL}${movie.movieImage.replace("./", "/")}`;
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const handleDateChange = (date) => {
<<<<<<< HEAD
    //날짜를 정할수 있는 핸들러
    setSelectedDate(date);
    setSelectedTime(null); // 날짜 변경 시 선택한 시간 초기화
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const calendar = ({ date, view }) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 6);

    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return view === 'month' && (date < today.setHours(0,0,0,0) || date > maxDate || date > lastDayOfMonth);
    /*  date < today.setHours(0,0,0,0) 오늘 날짜 시간을 00:00:00으로 설정 오늘 이전 날짜 비활성화 
       date < today를 지우면 오늘 기준 8/19일이 선택 가능 하지만 그 전 날짜들도 선택되기 때문에
       today.setHours(0, 0, 0, 0)을 사용하여 오늘 날짜의 시간을 00:00:00으로 설정
       이렇게 하면 오늘 날짜와 그 전 날짜를 정확하게 비교 가능 오늘 이전의 날짜만 비활성화
    */
};


  /*
  const WeekDate = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i <= 7; i++) {
      // for문을 사용하여 현재 날짜를 포함해 일주일 동안 날짜 출력
      const date = new Date(today);
      date.setDate(today.getDate() + i); // 오늘 날짜부터 i가 0이면 오늘 1이면 내일 식으로 계속 +
      const dateString = date.toISOString().split("T")[0];
      options.push(dateString);
    }
    return options;
    /*
        toISOString().split('T')[0]; : 날짜를 ISO 8601 문자열 형식으로 변환 (YYYY-MM-DD)
        split('T')[0]; : 문자열을 특정 구분자로 분할하고 그 중 첫 번째 부분을 선택하는 작업을 수행
        여기서 'T'는 반드시 존재해야 한다 ISO 8601 날짜 형식에서 날짜와 시간을 구분하는 문자로 없으면 구분하지 못해 기능실행 안됨
        
=======
    if (date) {
      setSelectedDate(date);
    } else {
      console.error("잘못된 날짜 선택");
    }
    setSelectedTime(null); // 날짜 변경 시 선택한 시간 초기화
  };

  const calendar = ({ date, view }) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 6);

    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    return (
      view === "month" &&
      (date < today.setHours(0, 0, 0, 0) ||
        date > maxDate ||
        date > lastDayOfMonth)
    );
>>>>>>> wongi11
  };
  */

  const handleAdultTickets = (e) => {
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      value <= 4 &&
      value + childTickets <= 4
    ) {
      setAdultTickets(value);
      setSelectedSeat([]);
    }
  };

  const handleChildTickets = (e) => {
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      value <= 4 &&
      value + adultTickets <= 4
    ) {
      setChildTickets(value);
      setSelectedSeat([]);
    }
  };

  const PointUseTotalPrice = () => {
    const totalPrice = adultTickets * 100 + childTickets * 100;
    const finalPrice = usingPoints ? totalPrice - usePoints : totalPrice;
    return finalPrice > 0 ? finalPrice : 0;
  };

  const Accumulate = () => {
    return usingPoints
      ? 0
      : Math.floor((adultTickets * 100 + childTickets * 100) * 0.1);
  };

  const UsePointChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= Pointsheld) {
      setUsePoints(value);
    }
  };

  const UsePoints = () => {
    setUsingPoints(!usingPoints);
    if (!usingPoints) {
      setUsePoints(0);
    }
  };

  const resetbutton = () => {
    setSelectedMovie(null);
    setSelectedRegion(null);
    setSelectedSeat([]);
    setSelectedTime(null);
    setSelectedDate(null);
    setNumPeople(1);
    setAdultTickets(0);
    setChildTickets(0);
    setUsePoints(false);
  };

  const handleConfirmPayment = () => {
    if (!loginin) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/MemberLogin");
      return;
    }
  
    if (
      !selectedMovie ||
      !selectedRegion ||
      !selectedDate ||
      !selectedTime ||
      (adultTickets === 0 && childTickets === 0) ||
      selectedSeat.length === 0
    ) {
      alert("모든 항목을 선택해야 결제 페이지로 넘어갑니다.");
      return;
    }
  
    // 대한민국 시간대에 맞춘 날짜 포맷
    const selectedDateString = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
  
    // 총 결제 금액 계산
    const finalPrice = PointUseTotalPrice();
    // 적립될 포인트 계산
    const accumulatedPoints = Accumulate(); // 총 결제금액의 10%
  
    // 현재 포인트에 적립 포인트 더하기
    const newTotalPoints = Number(loginMember.memberPoint) + Number(accumulatedPoints);
  
    // 포인트 업데이트 반영한 회원 정보
    const updatedLoginmember = {
      ...loginMember,
      memberPoint: newTotalPoints,
    };
  
    // 상태 업데이트
    setLoginMember(updatedLoginmember);
  
    // 로컬 스토리지에도 업데이트된 포인트 반영.
    localStorage.setItem("loginMember", JSON.stringify(updatedLoginmember));
  
    alert(`결제 페이지로 넘어갑니다.`);
    resetbutton();
  
    navigate("/payment/checkout", {
      state: {
        productName: `${
          selectedMovie.movieTitle
        }/ ${movieNo} / ${selectedRegion} / ${selectedDate} / ${selectedTime} / ${selectedSeat.join(
          ", "
        )}`,
        finalPrice,
        adultTickets,
        childTickets,
        selectedSeat: selectedSeat.join(", "), // 좌석을 문자열로 전달
        selectedDate: selectedDateString, // 대한민국 시간대에 맞춘 YYYY-MM-DD 형식의 날짜 전달
        selectedTime,
        selectedRegion,
        usePoints,
        accumulatedPoints, // 새로 적립된 포인트 전달
        memberNo: loginMember.memberNo,
        movieNo: movieNo,
        memberGrade: loginMember.memberGrade,
        memberPayCount: loginMember.memberPayCount,
        Pointsheld: newTotalPoints, // 업데이트된 포인트 전달
      },
    });
  };

  return (
    <div className="booking">
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleMovieClick(movie)}
          >
            <img src={getPosterPath(movie)} alt={movie.movieTitle} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
      <div className="content">
        <div className="resetbutton">
          <button onClick={resetbutton}>예매 다시하기</button>
        </div>
        <div className="MTheader">
          {selectedMovie ? (
            <>
              <div className="movie-info">
                <img src={getPosterPath(selectedMovie)} alt="Movie Poster" />
                <div className="movie-details">
                  <p>영화 : {selectedMovie.movieTitle}</p>
                  <p>영화관 : {selectedRegion}</p>
<<<<<<< HEAD
                  <p>관람일시 : {selectedDate ? selectedDate.toLocaleDateString('ko-KR',{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  }) : "날짜를 선택하세요"}</p> 
                  {/* selectedDate가 선택되지 않으면 날짜를 선택하세요 출력 toDateString() 형식으로 날짜 출력 */}
                  {/* toLocaleDateString('ko-KR' : 한국어 형식으로 날짜를 표시하기 위한 로케일
                      year: 'numeric' 연도를 숫자로 표시
                      month: 'long' 월을 8월처럼 전체 이름 표시
                      day: 'numeric 은 일을 숫자로 표시
                      weekday: 'long' 은 요일을 수요일로 표시
                  
                  */}
=======
                  <p>
                    관람일시 :{" "}
                    {selectedDate
                      ? selectedDate.toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          weekday: "long",
                        })
                      : "날짜를 선택하세요"}
                  </p>
>>>>>>> wongi11
                  <p>상영시간 : {selectedTime}</p>
                  <p>
                    선택좌석 :{" "}
                    {selectedSeat.length > 0 ? selectedSeat.join(", ") : "없음"}
                  </p>
                </div>
              </div>
              <div className="total-price">
                <div className="infobutton">
                  <p>총 결제금액: {PointUseTotalPrice()} 원</p>
                  <p>
                    포인트 사용 여부 :
                    <input
                      type="checkbox"
                      checked={usingPoints}
                      onChange={UsePoints}
                    />
                    <p>보유 포인트 : {Pointsheld} 점 </p>
                  </p>
                  {usingPoints && (
                    <p>
                      사용할 포인트 :
                      <input
                        type="number"
                        value={usePoints}
                        onChange={UsePointChange}
                      />
                    </p>
                  )}
                  <p>적립될 포인트 : {Accumulate()}점</p>
                  <button
                    className="confirm-button"
                    onClick={handleConfirmPayment}
                  >
                    결제
                  </button>
                </div>
              </div>
              <div>
<<<<<<< HEAD
              <p><strong>※ 포인트를 사용해 예매 할 경우<br/>포인트는 따로 적립되지 않습니다.</strong></p>
              <p><strong>※ 관람일 선택은 오늘 날짜 포함 7일 입니다.</strong></p>
=======
                <p>
                  <strong>
                    ※ 포인트를 사용해 예매 할 경우
                    <br />
                    포인트는 따로 적립되지 않습니다.
                  </strong>
                </p>
                <p>
                  <strong>※ 관람일 선택은 오늘 날짜 포함 7일 입니다.</strong>
                </p>
>>>>>>> wongi11
              </div>
            </>
          ) : (
            <div className="default-movie-info">
              <img
                src={process.env.PUBLIC_URL + "/movieimages/select_movie1.jpg"}
                alt="Default"
              />
              <p>선택한 영화가 없습니다.</p>
            </div>
          )}
        </div>
        <div className="steps-row">
          <div className="step">
            <p>STEP1: 영화관 선택</p>
            <button
              className="step-button"
              onClick={() => handleRegionChange("강남")}
            >
              강남
            </button>
            <button
              className="step-button"
              onClick={() => handleRegionChange("역삼")}
            >
              역삼
            </button>
          </div>
         {/**   <div className="step">
            <p>STEP2: 관람일 선택</p>
<<<<<<< HEAD
            <select value={selectedDate} onChange={handleDateChange}>
              <option value="">날짜를 선택하세요</option>
              {WeekDate().map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div> */}
         
          <div className="step">   
            <p>STEP2: 관람일 선택</p>
           <Calendar className="mtcalendar"
            onChange={handleDateChange}
            value={selectedDate || new Date()}
            tileDisabled={calendar}      
            showNeighboringMonth={false}
            tileClassName={({date,view}) => 
              view === 'month' && selectedDate && date.toDateString() === selectedDate.toDateString()
                ? 'react-calendar_tile--active'
                : ''
              }  
            />     
=======
            <Calendar
              className="mtcalendar"
              onChange={handleDateChange}
              value={selectedDate || new Date()}
              tileDisabled={calendar}
              showNeighboringMonth={false}
              tileClassName={({ date, view }) =>
                view === "month" &&
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
                  ? "react-calendar_tile--active"
                  : ""
              }
            />
>>>>>>> wongi11
          </div>
          <div className="step">
            <p>STEP3: 관람시간 선택</p>
            <button
              className="step-button"
              onClick={() => handleTimeChange("10:40:00")}
              disabled={isTimePassed(10, 40)}
            >
              10:40
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("13:45:00")}
              disabled={isTimePassed(13, 45)}
            >
              13:45
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("17:00:00")}
              disabled={isTimePassed(17, 0)}
            >
              17:00
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("19:40:00")}
              disabled={isTimePassed(19, 40)}
            >
              19:40
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("22:20:00")}
              disabled={isTimePassed(22, 20)}
            >
              22:20
            </button>
          </div>
          <div className="step">
            <p>STEP4: 좌석 및 잔여석 확인</p>
            <div className="seat-selection">
              <label>
                일반 (100원)
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={adultTickets}
                  onChange={handleAdultTickets}
                />
                <br />
              </label>
              <label>
                청소년 (100원)
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={childTickets}
                  onChange={handleChildTickets}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="screen">
          <p className="moviescreen">SCREEN</p>
          <div className="seats">
            {["A", "B", "C", "D", "E", "F", "G", "H"].map((row) => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => {
                  const seat = `${row}${col}`;
                  return (
                    <button
                      key={seat}
                      className={`seat ${
                        selectedSeat.includes(seat) ? "selected" : ""
                      } ${selectedandSeat.includes(seat) ? "booked" : ""}`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={selectedandSeat.includes(seat)} // 예매된 좌석은 비활성화
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="notice">
          <p>예매 시 주의사항</p>
          <dl>
            <dt>1. 홈페이지 예매 후 영화별 실수관번호 발행될 수 있습니다.</dt>
            <dt>
              2. 영화 예매는 관람일 전날 취소 시 수수료 없이 취소 가능합니다.
            </dt>
            <dt>3. 상영관 입장은 상영시간 10분 전부터 가능합니다.</dt>
            <dt>4. 할인혜택은 중복적용이 불가합니다.</dt>
            <dt>5. 좌석은 한 계정당 총 4자리만 예매 가능합니다.</dt>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Booking;
