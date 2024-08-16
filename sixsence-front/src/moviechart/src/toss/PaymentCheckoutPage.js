import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../css/PaymentCheckoutPage.css';

const clientKey = "test_ck_본인ck";
const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);
const customerKey = generateRandomString();

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const { stadium, personCount, reservationDate, reservationTime, totalPrice } = location.state;

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
          value: totalPrice,
        },
        orderId,
        orderName: `${stadium.stadiumName} 예약 (${reservationDate}, ${reservationTime} 시간대, ${personCount}명)`,
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/payment/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
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

export default PaymentCheckoutPage;
