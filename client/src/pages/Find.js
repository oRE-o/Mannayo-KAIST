import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MeetingCard from '../components/MeetingCard';
import Searchbar from '../components/Searchbar';
import axios from 'axios';
import { APIURL } from '../tools/api';

const FindPage = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get(APIURL + '/meeting/get', { withCredentials: true });
                setMeetings(response.data);
            } catch (error) {
                console.error('Failed to fetch meetings:', error);
            }
        };
        
        fetchMeetings();
    }, []);
    
    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>

                <div className="title-button-wrapper">
                    <div className="title-wrapper">
                        <div className="small-title">GET INVOLVED</div>
                        <div className="greetings">| 만나요에서 새로운 만남을 찾아보세요.</div>
                        <div className="greetings">| 10개의 만남이 당신을 기다리고 있어요!</div>
                    </div>
                    <a href="/newMeeting" className="new-meeting">새로운 만남 게시하기</a>
                </div>
                <Searchbar/>
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