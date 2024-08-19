import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState, useContext,  } from "react"; //useContext login 회원정보 가져옴
import { useNavigate,useLocation } from "react-router-dom"; // Booking.js 에서 저장한 정보데이터 가져옴
import './tosspay.css';
import LoginContext from "../../../login/LoginContext"; // usecontext로 가져온 login

const clientKey = "test_ck_26DlbXAaV01XDv0Gew4xrqY50Q9R";
const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);
const customerKey = generateRandomString();

export function PaymentCheckoutPage() {
  const {loginMember} = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const {
    selectedMovie ,
    selectedSeat,
    selectedRegion,
    selectedDate,
    selectedTime,
    totalPrice,
    usingPoints,
    usePoints,
    adultTickets ,
    childTickets ,
    finalPrice
  } = location.state || {};

  const finalAmount = usingPoints ? totalPrice - usePoints : totalPrice;
  console.log("Final Amount : ", finalAmount);

  const moviepayData = {
    moviepayNo: 0,
    moviepayAdult: adultTickets,
    moviepayChild: childTickets,
    moviepayAdultpay: adultTickets * 100,
    moviepayChildpay: childTickets * 100,
    moviepayPrice: finalAmount,
    moviepaySeat: selectedSeat.join(', '),
    moviepayPaydate: new Date().toISOString().split('T')[0], // 현재 날짜 및 시간
    moviepayPointUse: usingPoints ? 'Y' : 'N',
    moviepayPoint: usePoints,
    moviepayRefund: 'N', 
    moviepayViewdate: selectedDate,
    movieNo: selectedMovie.id,
    memberNo: loginMember.id,
    moviepayViewtime: selectedTime,
    moviepayViewregion: selectedRegion,
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    console.log("Selected Payment Method : ", method);
  };

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey,
        });
        setPayment(payment);
        console.log("Payment object created: ", payment);
      } catch (error) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    }

    fetchPayment();
  }, []);

  const requestPayment = async () => {
    try {
      const orderId = generateRandomString();
      console.log("Requesting payment with orderId: ", orderId);
      console.log("Final Amount: ", finalAmount);
      console.log("Order Name: ", selectedMovie.title);
  
      const response = await payment.requestPayment({
        method: selectedPaymentMethod,
        amount: {
          currency: "KRW",
          value: finalAmount,
        },
        orderId,
        orderName: selectedMovie.title,
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/payment/fail",
        customerEmail: loginMember.email,
        customerName: loginMember.name,
        customerMobilePhone: loginMember.phone,
      });
  
      // 결제 성공 시 서버에 데이터 전송
      const moviepayResponse = await fetch('/api/moviepay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviepayData),
      });
  
      if (!moviepayResponse.ok) {
        throw new Error('결제 정보 저장 중 오류가 발생했습니다.');
      }
  
      console.log(response);
      navigate('/payment/success');
    } catch (error) {
      console.error("오류 발생:", error.message || error);
      navigate('/payment/fail');
    }
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        
        <h1>일반 결제</h1>
        <div>
          <p>영화 : {selectedMovie}</p>
          <p>영화관 : {selectedRegion}</p>
          <p>관람일시 : {selectedDate} {selectedTime}</p>
          <p>좌석 : {selectedSeat} </p>
          <p>인원 : 성인 {adultTickets}명 , 어린이 {childTickets}명</p>
          <p>보유 포인트 : {usingPoints} 점</p>
          <p>사용한 포인트 {usePoints} 점</p>
          <p>총 결제금액 : {finalPrice} 원</p>
          
        </div>

        <div id="payment-method">
          {["CARD", "TRANSFER", "VIRTUAL_ACCOUNT", "MOBILE_PHONE", "CULTURE_GIFT_CERTIFICATE", "FOREIGN_EASY_PAY"].map((method) => (
            <button 
              key={method}
              id={method}
              className={`button2 ${selectedPaymentMethod === method ? "active" : ""}`}
              onClick={() => selectPaymentMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>
        <button className="button" onClick={() => {
          console.log("결제 버튼 클릭");
          requestPayment();
        }}>
          결제하기
        </button>
      </div>
    </div>
  );
}
 