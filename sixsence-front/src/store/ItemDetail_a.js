
// items.js 에서 선택한 아이템 번호를 가지고와서 
// 해당 아이템 번호로 items DB에 조회하여 해당하는 아이템 정보들을 가져와 변수에 넣기
import React, { useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemNavigationBar from './ItemNavigationBar';
import './Item.css';
import LoginContext from '../LoginContext';
import axios from 'axios';

const ItemDetail_a = () => {
    const { loginMember } = useContext(LoginContext);
    const location = useLocation(); // useNavigate를 이용해 전송된 데이터를 받을 수 있으
    const { item } = location.state || {}; // state로 전달된 item 데이터를 수신
    const navigate = useNavigate();

    const [itemCount, setItemCount] = useState(1);
    const [sumPrice, setSumPrice] = useState(item.itemPrice);

    const [userCartItem, setUserCartItem] = useState([]);

    

    const decreasItemCount = () => {
        setItemCount(itemCount >1 ? (itemCount -1) : 1);
    }

    const increasItemCount = () => {
        setItemCount(itemCount < 9 ? (itemCount +1) : 9);
    }

    /*
    const updatePrice = () => {
        setSumPrice(sumPrice * itemCount);
    }
    */

    useEffect(() => {
        setSumPrice(item.itemPrice * itemCount);
    }, [itemCount, item.itemPrice]);

    const getUserCart = () => {
        axios.get('/getusercart', {params: {memberNo: loginMember.memberNo}})
        .then(res => {
            setUserCartItem(res.data);
        })
        .catch(err => {
            console.log("에러발생 : ", err);
        })
        console.log("userCartItem : ", userCartItem);
    }

    useEffect(() => {
        getUserCart();
    }, [userCartItem])

    // 로그인 확인
    const checkLogin = () => {
        if (!loginMember) {
          const shouldNavigate = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
          if (shouldNavigate) {
            navigate('/user-login');
            return false;
          } else {
            return false;
          }
        }
        return true;
      };

    const addCart = () => {
        const cartObj = {};
        cartObj.itemNo = item.itemNo;
        cartObj.memberNo = loginMember.memberNo;
        cartObj.shoppingCount = itemCount;
        cartObj.shoppingPrice = sumPrice;

        console.log("cartObj : ", cartObj);

        if(checkLogin()) { // 로그인 되어있다면
            let isItem = false;
            for (let i = 0; i < userCartItem.length; i++) {
                if (userCartItem[i].itemNo == item.itemNo) {
                    isItem = true;
                    break;
                }
            }

            if (isItem) {
                const shouldNavigate = window.confirm("해당상품이 장바구니에 이미 있습니다. 장바구니 페이지로 이동하시겠습니까");
                if (shouldNavigate) {
                    navigate('/store/user-cart', {state: {cartItems : userCartItem} });
                }
            } else { 
                axios.post("/addcart", cartObj, {
                    headers: {
                    "Content-Type": "application/json", 
                    }
                })
                .then(() => {
                    alert("장바구니에 추가되었습니다.");
                })
                .catch(error => {
                    console.error("장바구니 추가 실패:", error);
                });
                
                getUserCart();
            }
        }
    }

    // 구매페이지로 보낼 변수값들
    const purchase = () => {
        if (checkLogin()) {
        // 먼저 로그인이 되어있지 않으면 리턴 시키기
        //console.info("item : ", item);
        //console.info("itemCount : ", itemCount);
        //console.info("sumPrice : ", sumPrice);
        //navigate( '/이동경로', { state: { 키: 값, 키: 값, ... } } )
        /*
        navigate('/store/purchase', {state: {itemNo: item.itemNo, 
                                            itemName: item.itemName,
                                            itemImage: item.itemImage,
                                            itemPackage: item.itemPackage,
                                            itempayCount: itemCount,
                                            itempayPrice: sumPrice}})
        */
            const purchaseData = {
                itemNo: item.itemNo,
                itemName: item.itemName,
                itemImage: item.itemImage,
                itemPackage: item.itemPackage,
                itemPrice: item.itemPrice,
                itemPayCount: itemCount,
                itemPayPrice: sumPrice
            };
            navigate('/store/purchase', { state: { items: [purchaseData] } });
        }
    }

    return (
        <>
            <div className='item-nav'>
                <ItemNavigationBar cartItems={userCartItem} />
            </div>
            <div className='item-detail-container'>
                <section className='item-detail'>
                    <h1>{item.itemName}</h1>
                    <div className='item-detail-row'>
                        <div className='item-detail-image'>
                            <img src={item.itemImage} alt={item.itemName} />
                        </div>
                        <div className='item-detail-info'>
                            <div className='item-detail-text'>
                                <p>{item.itemPrice} 원</p>
                                <p>구성품 {item.itemPackage}</p>
                                <p>판매수량 1회 9개 구매가능</p>
                                <p>{item.itemDes}</p>
                            </div>
                            <div className='item-detail-price'>
                                <div className='item-detail-price-button'>
                                    수 량
                                    <button type='button' onClick={decreasItemCount}>-</button>
                                    {/*<input type='text' value={itemCount} onChange={e => updatePrice()} readOnly/>*/}
                                    <input type='text' value={itemCount} readOnly/>
                                    <button type='button' onClick={increasItemCount}>+</button>
                                </div>
                                <div className='item-detail-price-text'>
                                    <p>총 가격 : {sumPrice}</p>
                                </div>
                            </div>
                            <div className='item-detail-button'>
                                <button onClick={addCart}>&#128722;</button>
                                <button onClick={purchase}>구매하기</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default ItemDetail_a;