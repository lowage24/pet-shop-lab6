import React from "react";
import { BrowserRouter as useParams, useNavigate, BrowserRouter, Link } from 'react-router-dom';


function Header({handleLogout, isLoggedIn}) {

    return (
    <div className="header">
        <h1 className="header-logo">Pets</h1>
        <div className="header-links">
            <nav className="header-list">
                {isLoggedIn&&<li><Link className="header-link" to="/">Главная страница</Link></li>}
                {isLoggedIn&&<li><Link className="header-link" to="/cart">Корзина</Link></li>}
                {isLoggedIn&&<li><Link className="header-link" to="/order">Заказы</Link></li>}
                {!isLoggedIn&&<li><Link className="header-link" to="/login">Войти</Link></li>}
                {!isLoggedIn&&<li><Link className="header-link" to="/registration">Регистрация</Link></li>}
                {isLoggedIn&&<li className="header-link" onClick={()=>handleLogout()}>Выйти</li>}
            </nav>
            
        </div>
    </div>
    )

}

export default Header;