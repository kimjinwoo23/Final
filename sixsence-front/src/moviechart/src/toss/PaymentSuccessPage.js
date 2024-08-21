import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  const handleConfirmClick = async () => {
    const payInfo = JSON.parse(localStorage.getItem("payInfo"));
    console.log(payInfo);

    const requestData = {
      moviepayAdult: payInfo.adultTickets,
      moviepayChild: payInfo.childTickets,
      moviepayAdultpay: payInfo.adultTickets * 100,
      moviepayChildpay: payInfo.childTickets * 100,
      moviepayPrice: payInfo.finalPrice,
      moviepaySeat: payInfo.selectedSeat,
      moviepayPaydate: new Date().toISOString().split('T')[0],
      moviepayPointUse: payInfo.usePoints,
      moviepayPoint: payInfo.accumulatedPoints,
      moviepayViewdate: payInfo.selectedDate,
      moviepayViewtime: payInfo.selectedTime,
      movieNo: payInfo.movieId,
      memberNo: payInfo.memberNo,
      moviepayRefund : 'N',
      moviepayViewregion: payInfo.selectedRegion ,
      movieNo : payInfo.movieNo 
      
    };
    console.log("무비넘버 넘어오나 확인:", payInfo.movieNo);
    
    try {
      console.log(requestData);
      const response = await fetch("http://localhost:8080/moviepay/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
    
      const data = await response.text();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      alert("예매 정보가 성공적으로 저장되었습니다.");
      navigate("/"); // 예매 완료 후 홈으로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      alert("예매 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="box_section" style={{ width: "600px" }}>
      <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
      <h2>결제를 완료했어요</h2>
      <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
        <div className="p-grid-col text--left">
          <b>결제금액</b>
        </div>
        <div className="p-grid-col text--right" id="amount">
          {`${Number(searchParams.get("amount")).toLocaleString()}원`}
        </div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
        <div className="p-grid-col text--left">
          <b>주문번호</b>
        </div>
        <div className="p-grid-col text--right" id="orderId">
          {`${searchParams.get("orderId")}`}
        </div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
        <div className="p-grid-col text--left">
          <b>paymentKey</b>
        </div>
        <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
          {`${searchParams.get("paymentKey")}`}
        </div>
      </div>
      <button onClick={handleConfirmClick}>확인</button>
    </div>
  );
}

export default PaymentSuccessPage;
