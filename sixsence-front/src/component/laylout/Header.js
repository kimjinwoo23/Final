import React, {useContext} from "react";

import { Link, useNavigate } from "react-router-dom";

import LoginContext from "../../LoginContext";


const Header = () => {

    const {loginMember, setLoginMember} = useContext(LoginContext);
    const navigate = useNavigate();


    const logoutButton = () => {
        setLoginMember(null);
        localStorage.removeItem('loginMember');
        navigate('/main-home'); //logout rediect
    }

    return (
        <header>

            <nav>
                <div>
                    <Link to="/main-home">mainPage</Link>
                    <div>
                        <ul>
                            {!loginMember ? ( //  ? ( 로그인 O ) : ( 로그인 X )
                                <>
                                <li><Link to="/member-login">login</Link></li>
                                <li><Link to="/member-signup">signUp</Link></li>
                                </>
                            ):(
                                <>
                                <li>welcome, {loginMember.memberName}  !</li>
                                <li><button onClick={logoutButton}>logout</button></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    )


}

export default Header;