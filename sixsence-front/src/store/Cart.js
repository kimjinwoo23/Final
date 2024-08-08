import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import LoginContext from '../LoginContext';

const Cart = () => {
    const { loginMember } = useContext(LoginContext);
    const location = useLocation();
    
    return (
        <>
        <p>장바구니</p>
        </>
    )
}
export default Cart;