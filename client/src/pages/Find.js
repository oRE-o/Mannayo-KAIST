import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MeetingCard from '../components/MeetingCard';
import axios from 'axios';
import { APIURL } from '../tools/api';
import "./css/Searchbar.css"

const FindPage = () => {
    const [meetings, setMeetings] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isTimeMode, setIsTimeMode] = useState('');
    
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                let query = '';
                if (startTime && endTime) {
                    setIsTimeMode(true);
                    const response = await axios.post(APIURL + '/meeting/get', {startTime: startTime, endTime: endTime},{ withCredentials: true });
                    console.log(response);
                    setMeetings(response.data);
                }
                else {
                    setIsTimeMode(false);
                    const response = await axios.post(APIURL + '/meeting/get',{ withCredentials: true });
                    setMeetings(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch meetings:', error);
            }
        };
        
        fetchMeetings();
    }, [startTime, endTime]);


    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>

                <div className="title-button-wrapper">
                    <div className="title-wrapper">
                        <div className="small-title">GET INVOLVED</div>
                        <div className="greetings">| 만나요에서 새로운 만남을 찾아보세요.</div>
                        <div className="greetings">| {meetings.length}개의 만남이 당신을 기다리고 있어요!</div>
                    </div>
                    <a href="/newMeeting" className="new-meeting">새로운 만남 게시하기</a>
                </div>
                
                <div className="searchbar-wrapper">  

                    {isTimeMode ? (
                        <>
                            <div className="part-title">| 현재 참여 가능 시간으로 검색중입니다.</div>
                            <div className="part-title">| <a className='part-title-highlight' onClick={() => {setStartTime(); setEndTime();}}>검색 취소하기</a></div>
                        </>
                    ) : (
                        <div className="part-title">| 참여 가능 시간으로 검색해보세요.</div>
                    )}
                    <input type="datetime-local" className="datetime-selector" value={startTime} onChange={e => setStartTime(e.target.value)}></input>
                    <span className="search-ex">부터, </span>
                    <input type="datetime-local" className="datetime-selector" value={endTime} onChange={f => setEndTime(f.target.value)}></input>
                    <span className="search-ex">까지의 만남을 찾습니다.</span>
                </div>

                <div className='space-50px'></div>
                    
                <div className="list-wrapper">
                    {meetings.map(meeting => (
                        <MeetingCard
                            meetingName={meeting.meetingName}
                            startTime={meeting.startTime}
                            location={meeting.location}
                            host={meeting.host}
                            members={meeting.members}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default FindPage;