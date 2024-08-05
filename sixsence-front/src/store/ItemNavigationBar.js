import React from 'react';
import { Link } from 'react-router-dom';

const ItemNavigationBar = () => {
    return (
        <nav>
            <ul>
            <li><Link to="/store?itemType=1">콤보</Link></li>
                <li><Link to="/store?itemType=2">팝콘</Link></li>
                <li><Link to="/store?itemType=3">음료</Link></li>
            </ul>
        </nav>
    );
}

export default ItemNavigationBar;