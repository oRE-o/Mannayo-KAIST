import Footer from "../components/Footer";
import Header from "../components/Header";
import profileImgTemp from "./bocchi.jpg"
import "./css/profile.css"

const ProfilePage = () => {
    return (
        <>
            <Header />
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">PROFILE</div>
                <div className="greetings">| 24' 최용혁</div>
                <div className='space-50px'></div>
                <div className="profile-wrapper">
                    <img className="profile-img"src={profileImgTemp} alt="a"></img>
                    <div className="profile-text-wrapper">
                        <div className="profile-text"><span className="bold">이름 | </span><span className="name">최용혁</span></div>
                        <div className="profile-text"><span className="bold">학번 및 소속 | </span><span className="studentInfo">24' 새내기과정학부</span></div>
                        <div className="profile-text"><span className="bold">Instagram | </span><span className="SNS">@oreothecream</span></div>
                        <div className="profile-introduce">안녕하세요 저는 미친놈입니다.</div>
                    </div>
                </div>
                <div className='space-50px'></div>
                <div className="list-wrapper">
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProfilePage;