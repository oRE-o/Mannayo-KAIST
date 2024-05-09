import React from "react";
import "./css/Header.css"
import logo from "./logo300.png";

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="logo"></img>
            <ul className="navbar">
                <li className="nav-item">내 만남</li>
                <li className="nav-item">만남 찾기</li>
                <li className="nav-item">프로필</li>
                <li className="nav-item">로그인</li>
            </ul>
        </header>
    );
}

export default Header;