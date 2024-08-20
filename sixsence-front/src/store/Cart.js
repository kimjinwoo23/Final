import React, { useState } from 'react'
import ItemNavigationBar from './ItemNavigationBar';
import useCart from '../hooks/useCart';

const Cart = () => {
    const {cartItems, updateCartItem} = useCart();
    const [checkItems, setCheckItems] = useState([]);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if(checked) { 
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
        console.log("checkItems : ", checkItems);
    }

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
        <ItemNavigationBar />
        <table>
            <thead>
                <tr>
                    <th>
                        <input type='checkbox' name='select-all' onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={checkItems.length === cartItems.length} />
                    </th>
                    <th colSpan="2">상품명</th>
                    <th>판매금액</th>
                    <th>수량</th>
                    <th>구매금액</th>
                    <th>선택</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((cartItem, index) => (
                    <tr key={index}>
                        <td>
                            <input type='checkbox' name={`select-${cartItem.shoppingNo}`}
                            onChange={(e) => handleSingleCheck(e.target.checked, cartItem.shoppingNo)}
                            checked={checkItems.includes(cartItem.shoppingNo)} />
                        </td>
                        <td><img src={cartItem.itemImage} alt={cartItem.itemName}></img></td>
                        <td>
                            {cartItem.itemName}<br />
                            {cartItem.itemPackage}
                        </td>
                        <td>{cartItem.itemPrice}</td>
                        <td>
                            <input type='number'
                                value={cartItem.shoppingCount} 
                                min="1" max="9" 
                                onChange={(e) => updateCartItem(cartItem.shoppingNo, parseInt(e.target.value))}
                            />
                        </td>
                        <td>{cartItem.shoppingPrice}</td>
                        <td>
                            <button>삭제하기</button><br /><br />
                            <button>구매하기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Cart;