import Footer from "../components/Footer";
import Header from "../components/Header";
import MeetingCard from "../components/MeetingCard";
import "./css/dashboard.css";

const Dashboard = () => {
    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="title-button-wrapper">
                    <div className="title-wrapper">
                        <div className="small-title">DASHBOARD</div>
                        <div className="greetings">| 안녕하세요, 최용혁님!</div>
                        <div className="greetings">| 현재 예정된 만남이 7개 있습니다.</div>
                    </div>
                    <a href="/newMeeting" className="new-meeting">새로운 만남 게시하기</a>
                </div>
                <div className='space-50px'></div>
                <div className="list-wrapper">
                    <MeetingCard/>
                    <MeetingCard/>
                    <MeetingCard/>
                    <MeetingCard/>
                    <MeetingCard/>
                    <MeetingCard/>
                    <MeetingCard/>  
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Dashboard;