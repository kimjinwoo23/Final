import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginContext from '../LoginContext';
import ItemNavigationBar from './ItemNavigationBar';
import axios from 'axios';

const Cart_a = () => {
    const { loginMember } = useContext(LoginContext);
    const location = useLocation();
    // location.state 존재하면 그 안에서 cartItems를 추출하고 그 값을 initialCartItems라는 변수에 저장
    const { cartItems: initialCartItems } = location.state || {};
    // cartItems 상태를 초기화
    const [cartItems, setCartItems] = useState(initialCartItems || []);
    console.info("cartItems!!!!!!!!!!!!!!!!! :", cartItems);
    console.info("initialCartItems!!!!!!!!!!!!!!!!! :", initialCartItems);

    useEffect(()=> {
        axios.get('/getusercart', {params: {memberNo: loginMember.memberNo}})
        .then(res => {
            setCartItems(res.data);
        })
        .catch(err => {
            console.log("에러발생 : ", err);
        })
        console.log("cartItems : ", cartItems);
    }, []) 


    // 개수 변경 핸들러
    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1 || quantity > 9) return;

        setCartItems(cartItems.map(item => 
            item.shoppingNo === id ? 
            { ...item, shoppingCount: quantity, shoppingPrice: item.itemPrice * quantity } 
            : item
        ));

        /* DB 업데이트 호출
        axios.post('/update-cart-item', {
            shoppingNo: id,
            shoppingCount: quantity,
            shoppingPrice: cartItems.find(item => item.shoppingNo === id).itemPrice * quantity
        })
        .then(response => {
            console.log('Cart item updated successfully:', response.data);
        })
        .catch(error => {
            console.error('Failed to update cart item:', error);
        });
        */
    };
    

    // 체크된 아이템을 담을 배열
    const [checkItems, setCheckItems] = useState([]);

    // checkbox 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems(prev => [...prev, id]);
        } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== id));
        }
        console.log("checkItems : ", checkItems);
    };

    // checkbox 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
            // 전체 선택 클릭시 카트아이템의 모든 아이템을 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            cartItems.forEach((el) => idArray.push(el.shoppingNo));
            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }

    }
    
    return (
        <>
        <ItemNavigationBar cartItems={cartItems} />
        <p>장바구니</p>
        <table>
            <thead>
                <tr>
                    <th>
                        <input type='checkbox' name='select-all' onChange={(e) => handleAllCheck(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={checkItems.length === cartItems.length ? true : false} />
                    </th>
                    <th colSpan="2">상품명</th>
                    <th>판매금액</th>
                    <th>수량</th>
                    <th>구매금액</th>
                    <th>선택</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((cartItem, index)=> (
                    <tr key={index} >
                        <td>
                            <input type='checkbox' name={`select-${cartItem.shoppingNo}`}
                            onChange={(e) => handleSingleCheck(e.target.checked, cartItem.shoppingNo)}
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={checkItems.includes(cartItem.shoppingNo) ? true : false} />
                        </td>
                        <td><img src={cartItem.itemImage}></img></td>
                        <td>
                            {cartItem.itemName}<br />
                            {cartItem.itemPackage}
                        </td>
                        <td>{cartItem.itemPrice}</td>
                        <td>
                            {/*{cartItem.shoppingCount}*/}
                            <input type='number'
                                value={cartItem.shoppingCount} 
                                min="1" max="9" 
                                onChange={(e) => handleQuantityChange(cartItem.shoppingNo, parseInt(e.target.value))}
                            />
                        </td>
                        <td>{cartItem.shoppingPrice}</td>
                        <td>
                            <button>삭제하기</button><br></br><br></br>
                            <button>구매하기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Cart_a;