import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/signup.css"
import axios from "axios";
import { APIURL } from "../tools/api";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [ ID, setID ] = React.useState();
    const [ PW, setPW ] = React.useState();
    const [ PWcheck, setPWcheck ] = React.useState();
    const [ stuNum, setStuNum ] = React.useState();
    const [ name, setName ] = React.useState();

    const navigate = useNavigate();

    const createNewUser = async () => {
        if ( !ID || !PW || !PWcheck || !stuNum || !name) {
            window.alert('값이 입력되지 않은 곳이 있어요. 모두 입력해주세요.');
            return;
        }
        else if (stuNum.length !== 8) {
            window.alert('학번이 너무 짧거나 깁니다.');
            return;
        }
        else if (PW !== PWcheck) {
            window.alert('비밀번호가 서로 달라요. 다시 입력해주세요.');
            setPW('');
            setPWcheck('');
            return;
        }
        else {
            try {
                await axios.post(APIURL + '/users/signup', { id: ID, pw: PW, pwcheck: PWcheck, stuNum: stuNum, name: name });
                console.log('User created successfully!');
                window.alert(`${name}님, 만나요에 가입하신 것을 환영합니다!`);
                navigate("/login");
            }
            catch(err) {
                window.alert(`가입 도중 오류가 발생했습니다.\n${err.response.data.error}`);
                console.error('Error creating user:', err.response.data.error);
            }
            
        }
        
    };

    return (
        <>
            <Header />
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">SIGN UP</div>
                <div className="greetings">| 간단히 가입하세요.</div>
                <div className='space-50px'></div>
                <div className="register-wrapper">
                    <div className="register-id">
                        <p className="register-ex">| 사용할 ID를 입력해주세요.</p>
                        <input className="register-input" type="text" name="registerID" placeholder="ID" value={ID} onChange={(e) => setID(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className="register-pw">
                        <p className="register-ex">| 비밀번호를 입력해주세요.</p>
                        <input className="register-input" type="password" name="registerPW" placeholder="Password" value={PW} onChange={(e) => setPW(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className="register-pw-check">
                        <p className="register-ex">| 비밀번호를 한 번 더 입력해주세요.</p>
                        <input className="register-input" type="password" name="registerPWcheck" placeholder="Password Check" value={PWcheck} onChange={(e) => setPWcheck(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className="register-stuID">
                        <p className="register-ex">| KAIST 학번을 입력해주세요.</p>
                        <input className="register-input" type="number" name="registerStuID" placeholder="Student ID" value={stuNum} onChange={(e) => setStuNum(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="register-name">
                        <p className="register-ex">| 이름을 입력해주세요.</p>
                        <input className="register-input" type="text" name="registerStuName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className='space-30px'></div>
                    <input type="submit" value="출발" className="register-submit" onClick={(e) => createNewUser()}></input>
                </div>



                <div className='space-50px'></div>
                <div className="list-wrapper">
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default SignupPage;