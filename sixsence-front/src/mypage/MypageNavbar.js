import React, {useState} from "react";
import { Link } from 'react-router-dom';

const MypageNavbar = () => {

    const mypageMenu = [
        {name : '회원정보변경', path : '/MypageMain/memberInfoEdit'},
        {name : '예매내역', path : '/MypageMain/reservation'},
        {name : '구매내역', path : '/MypageMain/bought'},
        {name : '취소내역', path : '/MypageMain/refund'},
        {name : '한줄평', path : '/MypageMain/comment'},
        {name : '1:1문의내역', path : '/MypageMain/OBO'},
        {name : '회원탈퇴', path : '/MypageMain/deleteAccount'}
    ];

    const [select, setSelect] = useState('');

    const handleSelect = (index) => {
        setSelect(index);
    }

    return (
        <nav className="mypageNav">
            <ul>
                {mypageMenu.map((list, index)=> (
                    <li key={index}>
                        <Link to={list.path} className={index === select ? 'active':''}
                        onClick={() => {handleSelect(index)}}>{list.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MypageNavbar;
