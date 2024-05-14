import Footer from "../components/Footer";
import Header from "../components/Header";
import "./css/signup.css"

const SignupPage = () => {
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
                        <input className="register-input" type="text" name="registerID" placeholder="ID"></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className="register-pw">
                        <p className="register-ex">| 비밀번호를 입력해주세요.</p>
                        <input className="register-input" type="password" name="registerPW" placeholder="Password"></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className="register-pw-check">
                        <p className="register-ex">| 비밀번호를 한 번 더 입력해주세요.</p>
                        <input className="register-input" type="password" name="registerPWcheck" placeholder="Password Check"></input>
                    </div>

                    <div className="space-30px"></div>

                    <div className="register-stuID">
                        <p className="register-ex">| KAIST 학번을 입력해주세요.</p>
                        <input className="register-input" type="number" name="registerStuID" placeholder="Student ID"></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="register-name">
                        <p className="register-ex">| 이름을 입력해주세요.</p>
                        <input className="register-input" type="text" name="registerStuName" placeholder="Name"></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="register-dep">
                        <p className="register-ex">| 현재 주 학과를 입력해주세요.</p>
                        <input className="register-input" type="text" name="registerDep" placeholder="Department"></input>
                    </div>

                    <div className='space-30px'></div>
                    <input type="submit" value="출발" className="register-submit"></input>
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