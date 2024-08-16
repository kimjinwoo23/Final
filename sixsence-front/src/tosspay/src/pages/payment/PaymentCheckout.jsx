import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_26DlbXAaV01XDv0Gew4xrqY50Q9R";
const customerKey = generateRandomString();
/*
const amount = {
  currency: "KRW",
  value: 100,
};
*/
export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState(null);
  const location = useLocation();
  const { itemPayInfo } = location.state || {};
  console.log("itemPayInfo!!!!!", itemPayInfo);

  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 1, // 초기값은 1로 설정, 나중에 itemPayInfo로 업데이트
  });

  useEffect(() => {
    if (itemPayInfo && itemPayInfo.amount) {
      setAmount({
        ...amount,
        value: itemPayInfo.amount,
      });
    }
  }, [itemPayInfo]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  function selectPaymentMethod(method) {
    setSelectedPaymentMethod(method);
  }

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, [clientKey, customerKey]);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    switch (selectedPaymentMethod) {
      case "CARD":
        await payment.requestPayment({
          method: "CARD", // 카드 및 간편결제
          amount,
          orderId: generateRandomString(), // 고유 주문번호
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success", // 결제 요청이 성공하면 리다이렉트되는 URL
          failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
          customerEmail: itemPayInfo.itempay_email,
          customerName: itemPayInfo.itempay_buyer,
          customerMobilePhone: itemPayInfo.customerMobilePhone,
          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      case "TRANSFER":
        await payment.requestPayment({
          method: "TRANSFER", // 계좌이체 결제
          amount,
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: itemPayInfo.itempay_email,
          customerName: itemPayInfo.itempay_buyer,
          customerMobilePhone: itemPayInfo.customerMobilePhone,
          transfer: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
          },
        });
      case "VIRTUAL_ACCOUNT":
        await payment.requestPayment({
          method: "VIRTUAL_ACCOUNT", // 가상계좌 결제
          amount,
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: itemPayInfo.itempay_email,
          customerName: itemPayInfo.itempay_buyer,
          customerMobilePhone: itemPayInfo.customerMobilePhone,
          virtualAccount: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
            validHours: 24,
          },
        });
    
    }
  }



  return (
    <div className="wrapper">
      <div className="box_section">
        <h1>일반 결제</h1>
        <div id="payment-method" style={{ display: "flex" }}>
          <button id="CARD" className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`} onClick={() => selectPaymentMethod("CARD")}>
            카드
          </button>
          <button id="TRANSFER" className={`button2 ${selectedPaymentMethod === "TRANSFER" ? "active" : ""}`} onClick={() => selectPaymentMethod("TRANSFER")}>
            계좌이체
          </button>
          <button id="VIRTUAL_ACCOUNT" className={`button2 ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "active" : ""}`} onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}>
            가상계좌
          </button>
        
        
        
        </div>
        <button className="button" onClick={() => requestPayment()}>
          결제하기
        </button>
      </div>
    
      </div>

  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
