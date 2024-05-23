import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { APIURL } from "../tools/api";
import "./css/profile.css"

const ProfilePage = () => {
    return (
        <>
            <Header />
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">PROFILE</div>
                <div className="greetings">| n' 넙죽이</div>
                <div className='space-50px'></div>
                <div className="profile-wrapper">
                    <img className="profile-img"src={APIURL+"static/bocchi.jpg"} alt="a"></img>
                    <div className="profile-text-wrapper">
                        <div className="profile-text"><span className="bold">이름 | </span><span className="name">김넙죽</span></div>
                        <div className="profile-text"><span className="bold">학번 및 소속 | </span><span className="studentInfo">n' 영어영문학과</span></div>
                        <div className="profile-text"><span className="bold">Instagram | </span><span className="SNS">@oreothecream</span></div>
                        <div className="profile-introduce">절대 시간이 부족하여 여기까지 개발 못한 것이 맞습니다. ㅠㅠ.. </div>
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