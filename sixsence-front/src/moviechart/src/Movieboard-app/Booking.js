import React, { useState, useEffect, useContext } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import "./Booking.css";
import axios from "axios"; // 비동기로 axios를 사용해서 영화 데이터 로딩 경로설정
import LoginContext from "../../../login/LoginContext.js";
import  "react-calendar";
import Calendar from "react-calendar";



const Booking = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const location = useLocation(); // 전 무비차트페이지에서 선택한 값을 저장후 예매티켓으로 넘어오게끔 지정
  const queryParams = new URLSearchParams(location.search); // 쿼리파람으로 전 페이지의 내용 서치
  const movieId = queryParams.get("movieId");
  const [movies, setMovies] = useState([]);
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
  const [movieNo , setMovieNo] = useState(null); // 영화no
 

 
  const handleLogin = (userData) => { // 유저 로그인 핸들러
    localStorage.setItem('loginMember' , JSON.stringify(userData));
    setLoginIn(true);
  };
  //localStorage 브라우저에서 데이터를 영구적으로 저장할 수 있는 장소 브라우저를 닫고 열어도 데이터 유지

  useEffect(() => {
    const saveMember = localStorage.getItem('loginMember');
    if (saveMember) {
      setLoginMember(JSON.parse(saveMember));
      setLoginIn(true); // 로그인상태 유지 
    }else {
      setLoginIn(false);
    }
  }, [setLoginMember]); //새로고침

 

   /*useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Wonki11/moviejson/master/movies.json"
        );
        setMovies(response.data.results);
        if (movieId) {
          const movie = response.data.results.find(
            (m) => m.id === parseInt(movieId)
          );
          setSelectedMovie(movie);
        }
      } catch (err) {
        console.error("Error loading movie data: ", err);
      }
    };
    fetchMovies();
  }, [movieId]);*/

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/moviepay/movies"); // 서버에서 모든 영화 데이터를 가져옴
        setMovies(response.data);
        if (movieId) {
          const movie = response.data.find((m) => m.movieNo === parseInt(movieId));
          setSelectedMovie(movie);
        }
      } catch (err) {
        console.error("Error loading movie data: ", err);
      }
    };
    fetchMovies();
  }, [movieId]);
  

  /*useEffect(() => {
    // useLocation과 연계 무비차트페이지에서 선택한 movieId 값을 json 파일에서 확인후 데이터값을 가지고 넘어옴 (해당 영화 예매하기 버튼 누르면 예매티켓에서 그 영화 예매하는 걸로 바로 시작)
    // json 내용을 DB에 옮겨 적었을때 json으로 movieID값을 불러오지말고 DB로 불러와야 후에 영화 예매내역 insert할때 용이하다
    if (movieId && movies.length > 0) {
      const movie = movies.find((m) => m.id === parseInt(movieId)); // parseInt : 함수는 문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환
      setSelectedMovie(movie);
    }
  }, [movieId, movies]);
  */

  /*useEffect(() => {
    if (selectedMovie) {
      // 선택된 영화의 movieId에 해당하는 movieNo를 가져오기
      axios.get(`/moviepay/movie/${selectedMovie.id}`)
        .then(response => {
          console.log("응답 : ", movieData);
          const movieData = response.data;
          console.log("영화 : ", movieData);
          setMovieNo(movieData.movieNo); // movieNo 상태 업데이트
        })
        .catch(error => {
          console.error("오류 발생", error);
        });
    }
  }, [selectedMovie]);*/

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setMovieNo(movie.movieNo);
      
  };

  const handleSeatClick = (seat) => {
    if (selectedSeat.includes(seat)) {
      setSelectedSeat(selectedSeat.filter((s) => s !== seat));
    } else if (selectedSeat.length < (adultTickets + childTickets)) {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };

  const handleNumPeopleChange = (event) => { // 인원고르는 인풋박스 숫자만 들어갈수있게 설정한 기능
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 4) {
      setNumPeople(value);
      setSelectedSeat([]);
    }
  };

  const getPosterPath = (movie) => {
    return `${process.env.PUBLIC_URL}${movie.movieImage.replace('./', '/')}`;
}

  const handleRegionChange = (region) => {
    // 지역을 핸들링할수 있는 변수 지정 강남,역삼
    setSelectedRegion(region);
  };

  const handleDateChange = (date) => {
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

  /*const WeekDate = () => {
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
        
  };
  */

  const handleAdultTickets = (e) => {
    // 성인 티켓 제한 수량 숫자가아닌 값은 못들어가고 0보다 크고 4보다 작으며 성인티켓 값 + 어린이티켓 값 의 합이 4보다 작거나 같아야한다 라는 조건을 건 기능
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      value <= 4 &&
      value + childTickets <= 4
    ) {
      setAdultTickets(value);
      setSelectedSeat([]); // 티켓수 변경시 좌석 초기화
    }
  };

  const handleChildTickets = (e) => {
    // 어린이 티켓 제한 수량 숫자가아닌 값은 못들어가고 0보다 크고 4보다 작으며 어린이티켓 값 + 성인티켓 값 의 합이 4보다 작거나 같아야한다 라는 조건을 건 기능
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
    // 포인트 사용유무
    const totalPrice = adultTickets * 100 + childTickets * 100;
    const finalPrice = usingPoints ? totalPrice - usePoints : totalPrice; // 최종가격은 포인트를 사용했을때? 총가격에서 -사용한 포인트 : 총 토탈 가격
    return finalPrice > 0 ? finalPrice : 0; // 최종 결제 금액이 0보다 작으면 0으로 설정
  };

  const Accumulate = () => {
    //적립
    return usingPoints ? 0 : Math.floor((adultTickets * 100 + childTickets * 100) * 0.1); 
    //Math.floor 적립할때 소수점 버림처리하고 총 금액 0.1(10%)를 포인트로 적립
    //return usingPoints ? 0 포인트 사용하지 않을때(포인트사용이 0일때) 적립포인트 계산
  };

  const UsePointChange = (e) => {
    //숫자 이외의 다른 문자를 못넣게 기능 추가
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= Pointsheld ) {
      setUsePoints(value);
    }
  };

  const UsePoints = () => {
    // 포인트 사용
    setUsingPoints(!usingPoints);
    if (!usingPoints) {
      setUsePoints(0); // 만약 포인트 사용을 중지하면 기본값 포인트 0으로 설정
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
      navigate('/MemberLogin');
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
      alert('모든 항목을 선택해야 결제 페이지로 넘어갑니다.');
      return;
    }
  
    const finalPrice = PointUseTotalPrice(); // 최종 가격 계산
    const getPoints = Accumulate();
    setTotalPoints(totalPoints + getPoints - usePoints);

    alert(`결제 페이지로 넘어갑니다.`); 
    resetbutton();
  
    navigate('/payment/checkout', {
      state: {
        productName: `${selectedMovie.title}/ ${movieNo} / ${selectedRegion} / ${selectedDate} / ${selectedTime} / ${selectedSeat.join(", ")}`,
        finalPrice,
        adultTickets,
        childTickets,
        selectedSeat: selectedSeat.join(", "), // 좌석을 문자열로 전달
        selectedDate: selectedDate.toISOString().split('T')[0], // 날짜 yyyy-mm-dd로 전달
        selectedTime,
        selectedRegion,
        usePoints,
        accumulatedPoints: getPoints,
        memberNo:loginMember.memberNo, // 로그인사용자 memeberNO
        movieNo: movieNo, // DB movie 테이블 movieno
      }
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
                      checked={usingPoints} // 사용할 수 있는 총 포인트
                      onChange={UsePoints} // 사용할 포인트
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
                  <button className="confirm-button" onClick={handleConfirmPayment}>결제</button>
                </div>
              </div>
              <div>
              <p><strong>※ 포인트를 사용해 예매 할 경우<br/>포인트는 따로 적립되지 않습니다.</strong></p>
              <p><strong>※ 관람일 선택은 오늘 날짜 포함 7일 입니다.</strong></p>
              </div>
            </>
          ) : (
            <div className="default-movie-info">
              <img
                src={process.env.PUBLIC_URL + "/movieimages/select_movie1.jpg"}
                alt="Default"
                // 선택된 영화가 default 값일때 이미지경로를 설정해서 이미지 가져옴
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
          </div>
          <div className="step">
            <p>STEP3: 관람시간 선택</p>
            <button
              className="step-button"
              onClick={() => handleTimeChange("10:40")}
            >
              10:40
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("13:45")}
            >
              13:45
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("17:00")}
            >
              17:00
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("19:40")}
            >
              19:40
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("22:20")}
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                  <button
                    key={`${row}${col}`}
                    className={`seat ${
                      selectedSeat.includes(`${row}${col}`) ? "selected" : ""
                    }`}
                    onClick={() => handleSeatClick(`${row}${col}`)}
                    disabled={
                      row === "C" && (col === 4 || col === 5 || col === 6)
                    }
                  >
                    {`${row}${col}`}
                  </button>
                ))}
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
