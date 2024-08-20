import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// 1. 결제성공(단일품목) -> DB에 입력(상품번호, 회원번호, 결제일자, 결제금액, 상품수량, 구매자, 구매자메일, 
//                         마일리지사용여부, 마일리지사용금액, 환불여부, 결제영수증번호)
// 2. 결제성공(장바구니를 통한 아이템항목이 여러개)
// 3. 결제성공(장바구니를 통해 결제 -> 해당 상품 장바구니DB에서 삭제)
// 4. 구매자 이메일로 결제영수증보내기

function ItemPaymentSuccessPage() {
  const location = useLocation();
  const { paymentInfo } = location.state || {};
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  console.log("!!!!!paymentInfo!!!!!!!",paymentInfo);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };
    
      try {
        const response = await fetch("/confirm/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
    
        const responseText = await response.text();
        console.log('Raw Response:', responseText); 
    
        const json = JSON.parse(responseText);
        if (!response.ok) {
          throw { message: json.message, code: json.code };
        }
    
        return json;
      } catch (error) {
        console.error("Error during payment confirmation:", error);
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      }
    }
    
  }, [searchParams]);

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
      <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </div>
  );
}

export default ItemPaymentSuccessPage;