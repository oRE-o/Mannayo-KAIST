import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/login.css";
import axios from "axios";
import { APIURL } from "../tools/api";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    
    const [ ID, setID ] = React.useState();
    const [ PW, setPW ] = React.useState();
    const navigate = useNavigate();


    const loginUser = async () => {
        if (!ID || !PW) {
            window.alert('아이디, 비밀번호를 모두 입력해주세요.');
        }

        try {
            await axios.post(APIURL+'/users/login', { userID: ID, password: PW });
            console.log('Login successful:');
            // 로그인 성공 시 다음 동작 수행 (예: 리다이렉트)
            navigate("/dashboard");
          } catch (err) {
            console.error('Error logging in:');
            if (err.response.status === 401) {
                window.alert('아이디나 비밀번호가 다릅니다.');
              } else {
                window.alert('오류가 발생했습니다.');
                console.log(err.response);
            }
          }
    };
    return (
        <>
        <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">LOGIN</div>
                <div className="greetings">| 새로운 만남에 지금 참여하세요.</div>    
                <div className='space-50px'></div>
                <div  className="login-wrapper">
                    <div className="login-form">

                        <input type="text" name="userID" placeholder="ID" value={ID} onChange={(e) => setID(e.target.value)}></input>
                        <input type="password" name="userPW" placeholder="Password" value={PW} onChange={(e) => setPW(e.target.value)}></input>
                        <div className="space-15px"></div>
                        <input type="submit" value="Login" className="loginbutton" onClick={(e) => loginUser()}></input>
                        <div className="to-register-ex">계정이 없으시다면, <a href="/signup">여기</a>를 눌러 가입할 수 있어요.</div>
                    </div>
                </div>
                <div className="space-50px"></div>
            </div>
            <Footer/>
        </>
    );
}

export default LoginPage;