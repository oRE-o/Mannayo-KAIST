import Footer from "../components/Footer";
import Header from "../components/Header";
import MeetingCard from "../components/MeetingCard";
import Searchbar from "../components/Searchbar";

const FindPage = () => {
    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">GET INVOLVED</div>
                <div className="greetings">| 만나요에서 새로운 만남을 찾아보세요.</div>
                <div className="greetings">| 10개의 만남이 당신을 기다리고 있어요!</div>
                
                <Searchbar/>
                <div className='space-50px'></div>
                    
                <div className="list-wrapper">
                    <MeetingCard/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default FindPage;