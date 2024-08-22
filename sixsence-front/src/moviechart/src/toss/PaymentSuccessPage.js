import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  const handleConfirmClick = async () => {
    const payInfo = JSON.parse(localStorage.getItem("payInfo"));
    console.log(payInfo);
   
  //사용포인트 계산
   const Pointsheld = payInfo.Pointsheld; // 회원이 보유한 포인트
   console.log("포인트" , Pointsheld);
   const usePoints = payInfo.usePoints > 0 ? payInfo.usePoints : 0; //사용한 포인트
   const accumulatedPoints = payInfo.accumulatedPoints; // 적립된 포인트

   // 포인트 사용하면 적립 X 포인트 사용하면 차감
   const remainPoints = usePoints > 0
    ? Pointsheld - usePoints // 보유포인트에서 사용포인트 차감
    : Pointsheld + accumulatedPoints // 포인트 사용안하면 적립

    console.log("값확인", remainPoints);

    const requestData = {
      moviepayAdult: payInfo.adultTickets,
      moviepayChild: payInfo.childTickets,
      moviepayAdultpay: payInfo.adultTickets * 100,
      moviepayChildpay: payInfo.childTickets * 100,
      moviepayPrice: payInfo.finalPrice,
      moviepaySeat: payInfo.selectedSeat,
      moviepayPaydate: new Date().toISOString().split('T')[0],
      moviepayPointUse: payInfo.usePoints > 0 ? 'Y' : 'N',
      moviepayPoint: payInfo.usePoints > 0 ? payInfo.usePoints : 0,
      moviepayViewdate: payInfo.selectedDate,
      moviepayViewtime: payInfo.selectedTime,
      movieNo: payInfo.movieId,
      memberNo: payInfo.memberNo,
      moviepayRefund : 'N',
      moviepayViewregion: payInfo.selectedRegion ,
      movieNo : payInfo.movieNo ,
      memberGrade: payInfo.memberGrade,
      memberPayCount:payInfo.memberPayCount,
      accumulatedPoints: accumulatedPoints,
      remainPoints: remainPoints,
      
    };
    console.log("값확인2", requestData);
    //console.log("무비넘버 넘어오나 확인:", payInfo.movieNo);
    
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
      
      const paycount = await fetch("http://localhost:8080/moviepay/updatepayCount",{
        method:"POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          memberNo: payInfo.memberNo,
          remainPoints: remainPoints, // 차감 후 남은 포인트
        }),
      });
      console.log("값 확인 : " , paycount);

      if (!paycount.ok){
        throw new Error("회원 정보 업데이트 실패");
      }
      
      alert("예매 정보가 성공적으로 저장되었습니다.");
      navigate("/"); // 예매 완료 후 홈으로 이동
    } catch (error) {
      console.error("DB 저장 중 오류 발생:", error);
      alert("예매 정보를 저장하는 중 오류가 발생했습니다.");
    }

    localStorage.removeItem("payInfo");
    
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
