
// items.js 에서 선택한 아이템 번호를 가지고와서 
// 해당 아이템 번호로 items DB에 조회하여 해당하는 아이템 정보들을 가져와 변수에 넣기
import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemNavigationBar from './ItemNavigationBar';
import './Item.css';

const ItemDetail = () => {
    const location = useLocation(); // useNavigate를 이용해 전송된 데이터를 받을 수 있으
    const { item } = location.state || {}; // state로 전달된 item 데이터를 수신
    const navigate = useNavigate();

    let [itemCount, setItemCount] = useState(1);
    let [sumPrice, setSumPrice] = useState(item.itemPrice);

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

    // 구매페이지로 보낼 변수값들
    const purchase = () => {
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

    return (
        <>
            <div className='item-nav'>
                <ItemNavigationBar />
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
                                <button>&#128722;</button>
                                <button onClick={purchase}>구매하기</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default ItemDetail;