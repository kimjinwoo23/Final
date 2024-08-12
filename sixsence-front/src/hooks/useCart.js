import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../login/LoginContext';

const useCart = () => {
    const { loginMember } = useContext(LoginContext);
    const [cartItems, setCartItems] = useState([]);

    // 서버에서 장바구니 데이터 가져오기
    const fetchCartItems = async () => {
        if (!loginMember) return;
        
        try {
            const response = await axios.get('/getusercart', { params: { memberNo: loginMember.memberNo } });
            setCartItems(response.data);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [loginMember]);

    // 서버에 장바구니 데이터 추가
    const addCartItem = async (item) => {
        // 로그인 확인
        if (!loginMember) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 기존데이터이 있는 아이템인지 확인
        const existingItem = cartItems.find(cartItem => cartItem.itemNo === item.itemNo);
        if (existingItem) {
            alert("이미 장바구니에 있는 상품입니다.");
            return;
        }

        const cartObj = {
            itemNo: item.itemNo,
            memberNo: loginMember.memberNo,
            shoppingCount: item.shoppingCount || 1, //item.shoppingCount 가 있으면 사용 없으면 1
            shoppingPrice: item.shoppingPrice || item.itemPrice //item.shoppingPrice 가 있으면 사용 없으면 item.itemPrice값 사용
        };

        try {
            await axios.post("/add-cart", cartObj, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            await fetchCartItems();
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error("Failed to add cart item:", error);
        }
    };

    // 기존 장바구니 데이터 업데이트(수량, 가격)
    const updateCartItem = async (shoppingNo, quantity) => {
        console.info("shoppingNo", shoppingNo)
        console.info("cartItems", cartItems)
        if (quantity < 1 || quantity > 9) return;

        const updatedItem = cartItems.find(item => item.shoppingNo === shoppingNo);
        if (!updatedItem) return;

        try {
            await axios.put('/update-cart-item', { // 데이터 수정
                shoppingNo: shoppingNo,
                shoppingCount: quantity,
                shoppingPrice: updatedItem.itemPrice * quantity
            });
            // 상태변수를 사용하여 해당장바구니의 수량과 가격 업데이트
            // 기존 장바구니변수를 for루프를 item변수로 돌면서 해당 장바구니에 해당하면
            setCartItems(cartItems.map(item => 
                item.shoppingNo === shoppingNo ? 
                { ...item, shoppingCount: quantity, shoppingPrice: item.itemPrice * quantity } 
                : item
            ));
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
    };

    return {
        cartItems,
        addCartItem,
        updateCartItem,
        fetchCartItems
    };
};

export default useCart;
