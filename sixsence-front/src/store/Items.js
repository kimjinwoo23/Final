import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// 1. 상품분리(네비바와 같이) + 장바구니 버튼과 숫자 
// 2. DB에서 상품 데이터를 가져와(useEffect) 네비바에서 선택한 타입들의 상품들 보여주기
// 3. useEffect 로그인 한 아이디의 장바구니 데이터 가져오기(리스트) -> length로 장바구니 옆 숫자 업데이트 // 로그인한 아이디가 없으면 숫자는 0
// 4. 상단의 장바구니 아이콘 클릭 -> 장바구니 페이지로 이동
// 4. 각 상품 밑에 있는 장바구니 클릭 시 장바구니 리스트 업데이트
//    (장바구니에 item_no 있는지 확인 후 있으면 장바구니에 들어있는 목록이라고 알람창, 없으면 장바구니에 추가) // 로그인한 아이디가 없으면 로그인하라는 알람
// 5. 상품 클릭 -> 해당상품 detail로 이동 (Link)
// 6. 구매버튼 -> 결제페이지로 이동 (Link)
const Items = () => {
    const [items, setItems] = useState([]);

    const [cartItems, setCartItem] = useState([]); // 로그인한 아이디의 장바구니 정보 가져오기

    useEffect(() => {
        
        axios.get('/api/item') // controller와 연결할 주소값
        .then(response => {
            setItems(response.data); // DB에서 가져온 데이터를 변수값에 넣어주기
            
        })
        .catch(error => {
            console.log("에러발생 : " + error);
        })
    }, [])
        
        
    return (
        
        <div className=''>
            {items.map(item => ( // map -> for와 같은 역할
                <div key={item.itemNo} className='item'>
                    {/*<img src={item.itemImage} />*/}
                    <Link to={`/store/detail/${item.itemNo}`}>
                    <img src={`../../${item.itemImage}`} />
                    <h2>{item.itemName}</h2>
                    <p>{item.itemPackage}</p>
                    <p>{item.itemPrice}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default Items;