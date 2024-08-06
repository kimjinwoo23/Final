import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import ItemNavigationBar from './ItemNavigationBar';
import LoginContext from '../LoginContext';
// 장바구니쪽에서 넘어오는 데이터 1개 이상일 수 있으므로 list형태로 넣어야함
const ItemPurchase = () => {
    const { loginMember } = useContext(LoginContext);
    console.log("loginMember : ", loginMember);

    const location = useLocation();
    //const {itemNo, itemImage, itemName, itempayCount, itempayPrice} = location.state || {};
    const {items} = location.state || {item: []};

    const [usingPoint, setUsingPoint] = useState(0);

    
    console.info("itempurchase : ", items);
    /*
    console.info("itempurchase : ", itemNo);
    console.info("itempurchase : ", itemImage);
    console.info("itempurchase : ", itemName);
    console.info("itempurchase : ", itempayCount);
    console.info("itempurchase : ", itempayPrice);
    */
    const AllUsingPoing = () => {
        // 로그인한 아이디의 point값 가져오기
    }

    return (
        <>
        <div className='item-nav'>
            <ItemNavigationBar />
        </div>
        <div className='item-payment-contain'>
            <div className='item-payment-order-info'>
                <h3>주문자 정보 확인</h3>
                
                    <label>이름</label>
                    <input type='text' id='order-name'></input>
                
                
                    <label>이메일</label>
                    <input type='email' id='order-email'></input>
                
                    <input type='checkbox'></input> <label>주문자와 동일</label>
                    {/* input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.
                    <input></input>사이에 값이 있으면 발생
                    */}
                
            </div>
            <div className='item-payment-item-info'>
                <h3>구매상품 정보</h3>
                <table>
                    {/* list를 for루프 돌려서  */}
                    <thead>
                        <tr>
                            <th colSpan="2">상품명</th>{/* 상품이미지 + 상품명 + 상품package */}
                            <th>판매금액</th>
                            <th>수량</th>
                            <th>구매금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.itemNo}>
                                <td><img src={item.itemImage}/></td>
                                <td>
                                    {item.itemName} <br />
                                    {item.itemPackage}
                                </td>
                                <td>{item.itemPrice}</td>
                                <td>{item.itemPayCount}</td>
                                <td>{item.itemPayPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='item-payment-point-info'>
                <h3>포인트</h3>
                
                <label>사용할 포인트</label>
                <input type='number' value={usingPoint} /*max={로그인한유저테이블의point값}*/ onChange={(e) => setUsingPoint(e.target.value)} />
                
                
                <label>사용가능한 포인트</label>
                <input type='number' /*value={로그인한유저테이블의point값} />*/ />
                
                
                {/* 체크되면 사용할 포인트에 사용가능한 값으로 넣어주기, 체크해제되면 input에 사용할 포인트 값 비워주기 */}
                <input type='checkbox' onClick={AllUsingPoing}></input> <label>전체사용</label>
                
            </div>

            <div className='item-payment-pay-info'>
                <table>
                    <thead>
                        <tr>
                            <td>상품금액</td>
                            <td></td>
                            <td>할인금액</td>
                            <td></td>
                            <td>결제금액</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{/* 아이템들 가격 총합 */}</td>
                            <td>-</td>
                            <td>{usingPoint}</td>
                            <td>=</td>
                            <td>{/* 아이템들 가격 총합 */}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='item-payment-pay-method'>
                <h3>결제수단</h3>
            </div>
        </div>
        </>
    )
}
export default ItemPurchase;