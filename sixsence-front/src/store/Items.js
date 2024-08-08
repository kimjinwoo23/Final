import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; //useNavigate 지정한 경로로 페이지를 이동, 두번째 인자로 이동시킬 페이지에 함께 보낼 데이터를 지정
import axios from 'axios'
import ItemNavigationBar from './ItemNavigationBar';
import './Item.css';
import LoginContext from '../LoginContext';
// 1. 상품분리(네비바와 같이) + 장바구니 버튼과 숫자 
// 2. DB에서 상품 데이터를 가져와(useEffect) 네비바에서 선택한 타입들의 상품들 보여주기
// 3. useEffect 로그인 한 아이디의 장바구니 데이터 가져오기(리스트) -> length로 장바구니 옆 숫자 업데이트 // 로그인한 아이디가 없으면 숫자는 0
// 4. 상단의 장바구니 아이콘 클릭 -> 장바구니 페이지로 이동
// 4. 각 상품 밑에 있는 장바구니 클릭 시 장바구니 리스트 업데이트
//    (장바구니에 item_no 있는지 확인 후 있으면 장바구니에 들어있는 목록이라고 알람창, 없으면 장바구니에 추가) // 로그인한 아이디가 없으면 로그인하라는 알람
// 5. 상품 클릭 -> 해당상품 detail로 이동 (Link)
// 6. 구매버튼 -> 결제페이지로 이동 (Link)
const Items = () => {
    const { loginMember } = useContext(LoginContext);
    console.log("items login : ", loginMember);
    const [items, setItems] = useState([]);
    const [userCartItem, setUserCartItem] = useState([]); // 카트에 담겨져있는 물품들
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const itemType = queryParams.get('itemType');

    //const [cartItems, setCartItem] = useState([]); // 로그인한 아이디의 장바구니 정보 가져오기
    // 아이템 DB정보 가져오기
    useEffect(() => {
        
        axios.get('/getitems') // controller와 연결할 주소값
        .then(response => {
            //console.log(response);
            setItems(response.data); // DB에서 가져온 데이터를 변수값에 넣어주기
            
        })
        .catch(error => {
            console.log("에러발생 : " + error);
        })
    }, [])

    const getUserCart = () => {
        axios.get('/getusercart', {params: {memberNo:loginMember.memberNo}})
        .then(res => {
            //console.log(res);
            setUserCartItem(res.data);
        })
        .catch(err => {
            console.log("에러발생 : ", err);
        })
        console.log("userCartItem : ", userCartItem);
    }

    // 장바구니 DB 가져오기
    useEffect(() => {
        /*
        axios.get('/getusercart', {params: {memberNo:loginMember.memberNo}})
        .then(res => {
            console.log(res);
            setUserCartItem(res.data);
        })
        .catch(err => {
            console.log("에러발생 : ", err);
        })
        console.log("userCartItem : ", userCartItem);
        */
        getUserCart();
    }, [userCartItem])

    // items를 itemType별로 거르기
    const filteredItems = itemType ? items.filter(item => item.itemType == itemType) : items;

    /*
    const ItemClick = (item, index) => {
        if (item.itemNo === (index+1)) {
            navigate(`/store/detail/${item.itemNo}`, { state: { item: items[index] } }); // 데이터 보낼때 state 속성으로 보내야함 
        }
    }
    */
    // 상세페이지 이동
    const ItemClick = (item, index) => {
        //navigate(`/store/detail/${item.itemNo}`, { state: { item: items[index] } });
        navigate(`/store/detail/${item.itemNo}`, { state: { item } });
    }

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

    // 장바구니 추가
    const addCart = (item) => {
        const cartObj = {};
        cartObj.itemNo = item.itemNo;
        cartObj.memberNo = loginMember.memberNo;
        cartObj.shoppingCount = 1;
        cartObj.shoppingPrice = item.itemPrice;

        console.log("userCartItem : ", userCartItem);
        
        if(checkLogin()) { // 로그인 되어있다면
            let isItem = false;
            for (let i = 0; i < userCartItem.length; i++) {
                if (userCartItem[i].itemNo == item.itemNo) {
                    isItem = true;
                    break;
                }
            }
            // 로그인 멤버의 카트 정보 가져와 기존에 장바구니에 담겨있는 아이템일경우 -> 수량을 업데이트 시킨다
            if (isItem) {
                //1. const shouldNavigate = window.confirm("해당상품이 장바구니에 이미 있습니다. 장바구니 페이지로 이동하시겠습니까"); -> 확인 -> 이동, 취소 -> 아무일도 일어나지않음
                //2. const shouldNavigate = window.confirm("해당상품이 장바구니에 이미 있습니다. 해당상품의 수량을 증가시키겠습니까?"); -> 확인 -> 업데이트, 취소 -> 아무일도 일어나지않음
                //3. 알람창 없이 수량 업데이트 단, 최대개수 9개 넘을 시 업데이트 하지 않음
                const shouldNavigate = window.confirm("해당상품이 장바구니에 이미 있습니다. 장바구니 페이지로 이동하시겠습니까");
                if (shouldNavigate) {
                    navigate('/store/user-cart', {state: {cartItem : [userCartItem]} });
                }

            } else { // 장바구니에 해당아이템이 없을 경우 등록한다
                axios.post("/addcart", cartObj, {
                    headers: {
                    "Content-Type": "application/json", // json 데이터를 전송할 때 Content-Type 은 application/json 형태
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

    // 아이템 구매
    const purchase = (item) => {
        /*
        // 로그인 여부 확인 -> 로그인 안되어있으면 리턴
        if (!loginMember) {
            // alert 창 2개 버튼 window.confirm
            const shouldNavigate = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
            if (shouldNavigate) {
                navigate('/user-login');
                return;
            } else {
                return;
            }
        }
        */
        if (checkLogin()) {

        
        // 구매페이지로 넘길 변수값들
        /*
        navigate('/store/purchase', {state: {itemNo: item.itemNo, 
                                            itemName: item.itemName,
                                            itemImage: item.itemImage,
                                            itemPackage: item.itemPackage,
                                            itempayCount: 1,
                                            itempayPrice: item.itemPrice}})
        */
            const purchaseData = {
                itemNo: item.itemNo, 
                itemName: item.itemName,
                itemImage: item.itemImage,
                itemPackage: item.itemPackage,
                itemPrice: item.itemPrice,
                itemPayCount: 1,
                itemPayPrice: item.itemPrice
            }
            navigate('/store/purchase', { state: { items: [purchaseData] } });
        }
    }
      
        
    return (
        <>
        
            <div className='item-nav'>
                <ItemNavigationBar />
            </div>
            <div className='item-container'>
                {/*{items.map((item, index) => ( // map -> for와 같은 역할*/}
                {filteredItems.map((item, index) => ( // map -> for와 같은 역할
                    <div key={item.itemNo} className='item-box'>
                        {/*
                        <ItemDetail item={item}/>
                        <Link to={`/store/detail/${item.itemNo}`}>*/}
                        <div onClick={()=> ItemClick(item, index)}>
                        {/*<img src={item.itemImage} />*/}      
                            <img src={item.itemImage} className='item-image'/>
                            <h2 className='item-name'>{item.itemName}</h2>
                            <p className='item-package'>{item.itemPackage}</p>
                            <p className='item-price'>{item.itemPrice}</p>
                        </div>
                        {/*</Link>*/}
                        <div className='item-actions'>
                            <button className='item-cart-button' onClick={()=> {addCart(item)}}>&#128722;</button>
                            <button className='item-buy-button' onClick={()=> {purchase(item)}}>구매하기</button>
                        </div>
                    </div>
                ))}
                
            </div>
        </>
    )
}
export default Items;