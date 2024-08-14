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
    selectedMovie,
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

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey,
        });
        setPayment(payment);
      } catch (error) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    }

    fetchPayment();
  }, []);

  const requestPayment = async () => {
    try {
      const orderId = generateRandomString();
      const response = await payment.requestPayment({
        method: selectedPaymentMethod,
        amount: {
          currency: "KRW",
          value: finalAmount, //최종가격 (포인트유무까지 한 가격)
        },
        orderId,
        orderName: selectedMovie ? selectedMovie.title  : "기본 주문명", // json으로 불러온 영화 타이틀 이름
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/payment/fail",
        customerEmail: loginMember.email, // useContext로 불러오고 DB에 저장된 유저멤버 정보 가져옴
        customerName: loginMember.name, // useContext로 불러오고 DB에 저장된 유저멤버 정보 가져옴
        customerMobilePhone: loginMember.phone,
      });
      console.log(response);
      
    } catch (error) {
      console.error("결제 요청 중 오류가 발생했습니다:", error);
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
          <p>좌석 : {selectedSeat}</p>
          <p>인원 : 성인 {adultTickets}명 , 어린이 {childTickets}명</p>
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
        <button className="button" onClick={requestPayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}