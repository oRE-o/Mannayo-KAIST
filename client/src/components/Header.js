
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Header.css"
import logo from "./logo300.png";
import axios from "axios";
import { APIURL } from "../tools/api";


const Header = () => {
    const navigate = useNavigate();
    const [ isAuth, setIsAuth ] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(APIURL + '/status' , { withCredentials: true });
                if (response.data.isAuthenticated) {
                    setIsAuth(true);
                    try {
                        const response = await axios.get(APIURL + '/users/get',{ withCredentials: true });
                        setUsername(response.data.username);
                    } catch (error){
                        console.error('failed to fetch name', error);
                    }  
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                console.error('Failed to check auth status:', error);
            }
        };
        checkAuthStatus();
        console.log('로그인인증했음');
    }, [navigate]);

    return (
        <header>
            <img src={logo} alt="logo" className="logo"  onClick={ () => navigate("/") }></img>
            <ul className="navbar">
                <li className="nav-item" onClick={ () => navigate("/dashboard") }>내 만남</li>
                <li className="nav-item" onClick={ () => navigate("/find") }>만남 찾기</li>
                <li className="nav-item" onClick={ () => navigate("/profile") }>프로필</li>
                {isAuth ? (
                    <>
                        <li className="nav-item" onClick={ () => {window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")} }>{username}님으로 로그인됨</li>
                        <li className="nav-item" onClick={ () => navigate("/logout") }>로그아웃</li>
                    </>
                ) : (
                    <li className="nav-item" onClick={ () => navigate("/login") }>로그인</li>
                )}
                
            </ul>
        </header>
    );
}

export default Header;