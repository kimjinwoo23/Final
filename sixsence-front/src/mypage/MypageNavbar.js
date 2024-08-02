import React, {useState} from "react";
import { Link } from 'react-router-dom';

const MypageNavbar = () => {

    const mypageMenu = [
        {name : '회원정보변경', path : '/memberInfoEdit'},
        {name : '예매내역', path : '/reservation'},
        {name : '구매내역', path : '/bought'},
        {name : '취소내역', path : '/refund'},
        {name : '한줄평', path : '/comment'},
        {name : '1:1문의내역', path : '/obo'},
        {name : '회원탈퇴', path : '/deleteAccount'}
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
