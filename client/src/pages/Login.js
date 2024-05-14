import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/login.css"
const LoginPage = () => {
    return (
        <>
        <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">LOGIN</div>
                <div className="greetings">| 로그인하여 새로운 만남에 지금 참여하세요!</div>
                <div className="greetings">| KAIST 학생 정보로 로그인할 수 있습니다. (예정)</div>
                <div className='space-50px'></div>
                <div  className="login-wrapper">
                    <div className="login-form">
                        <h2>Login</h2>
                        <input type="text" name="userID" placeholder="ID"></input>
                        <input type="password" name="userPW" placeholder="Password"></input>
                        <div className="space-15px"></div>
                        <input type="submit" value="Login" className="loginbutton"></input>
                    </div>
                </div>
                <div className="space-50px"></div>
            </div>
            <Footer/>
        </>
    );
}

export default LoginPage;