import React, {} from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import ItemNavigationBar from './ItemNavigationBar';
// 장바구니쪽에서 넘어오는 데이터 1개 이상일 수 있으므로 list형태로 넣어야함
const ItemPurchase = () => {
    const location = useLocation();
    const {itemNo, itemImage, itemName, itempayCount, itempayPrice} = location.state || {};

    

    console.info("itempurchase : ", itemNo);
    console.info("itempurchase : ", itemImage);
    console.info("itempurchase : ", itemName);
    console.info("itempurchase : ", itempayCount);
    console.info("itempurchase : ", itempayPrice);

    const AllUsingPoing = () => {

    }

    return (
        <>
        <div className='item-nav'>
            <ItemNavigationBar />
        </div>
        <div className='item-payment-contain'>
            <div className='item-payment-order-info'>
                <h3>주문자 정보 확인</h3>
                <div className=''>
                    <label>이름</label>
                    <input type='text' id='order-name'></input>

                    <label>이메일</label>
                    <input type='email' id='order-email'></input>

                    <input type='checkbox'></input> <label>주문자와 동일</label>
                    {/* input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.
                    <input></input>사이에 값이 있으면 발생
                    */}
                </div>
            </div>
            <div className=''>
                <h3>구매상품 정보</h3>
                <table>
                    {/* list를 for루프 돌려서  */}
                    <thead>
                        <tr>
                            <th colSpan="3">상품명</th>{/* 상품이미지 + 상품명 + 상품package */}
                            <th>판매금액</th>
                            <th>수량</th>
                            <th>구매금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='item-payment-point'>
                <h3>포인트</h3>
                <label>사용할 포인트</label>
                <input type='number' onChange={(e) => {}} />

                <label>사용가능한 포인트</label>
                <input type='number' /*value={로그인한유저테이블의point값} />*/ />

                {/* 체크되면 사용할 포인트에 사용가능한 값으로 넣어주기, 체크해제되면 input에 사용할 포인트 값 비워주기 */}
                <input type='checkbox' onClick={AllUsingPoing}></input> <label>전체사용</label>
            </div>
        </div>
        </>
    )
}
export default ItemPurchase;