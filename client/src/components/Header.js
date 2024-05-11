import React from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Header.css"
import logo from "./logo300.png";


const Header = () => {
    const navigate = useNavigate();
    return (
        <header>
            <img src={logo} alt="logo" className="logo"  onClick={ () => navigate("/") }></img>
            <ul className="navbar">
                <li className="nav-item" onClick={ () => navigate("/dashboard") }>내 만남</li>
                <li className="nav-item" onClick={ () => navigate("/find") }>만남 찾기</li>
                <li className="nav-item" onClick={ () => navigate("/profile") }>프로필</li>
                <li className="nav-item" onClick={ () => navigate("/login") }>로그인</li>
            </ul>
        </header>
    );
}

export default Header;