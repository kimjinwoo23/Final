import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

//const ItemNavigationBar = () => {
const ItemNavigationBar = () => {
    const {cartItems} = useCart();
    const [itemCount, setItemCount] = useState(0);

    useEffect(()=> {
        setItemCount(cartItems.length);
    }, [cartItems])
    
    return (
        <nav>
            <ul>
                <li><Link to="/store?itemType=1">콤보</Link></li>
                <li><Link to="/store?itemType=2">팝콘</Link></li>
                <li><Link to="/store?itemType=3">음료</Link></li>
                {/* <span class="badge bg-secondary">0</span></li>에 0 대신 변수값 넣어야 함 
                -> 로그인한 아이디의 장바구니 데이터들을 불러와 길이만큼 값을 나타냄 {로그인한아이디의cart길이} */}
                <li><Link to="/store/user-cart">Cart</Link><span className="badge bg-secondary">{itemCount}</span></li>
                
            </ul>
        </nav>
    );
}

export default ItemNavigationBar;