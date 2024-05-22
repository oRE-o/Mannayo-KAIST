import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { APIURL } from "../tools/api";
import "./css/newMeeting.css";
import "./css/meeting.css"


const Meeting = () => {
    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await axios.post(APIURL + '/meeting/getByID', { meetingID: meetingId });
                setMeeting(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMeeting();
    }, [meetingId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };

    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="title-button-wrapper">
                    <div className="title-wrapper">
                        <div className="small-title">MEETING</div>
                        <div className="greetings">| {meeting.meetingName}</div>
                    </div>
                </div>
                <div className='space-50px'></div>
                
                <div className="newmeeting-wrapper">
                    <div className="meeting-start">
                        <p className="meeting-big">| 만남이 시작되는 시간</p>
                        <p className="meeting-small">{new Date(meeting.startTime).toLocaleString('ko-KR', options)}</p>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="meeting-end">
                        <p className="meeting-big">| 만남이 종료되는 시간</p>
                        <p className="meeting-small">{new Date(meeting.endTime).toLocaleString('ko-KR', options)}</p>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="meeting-end">
                        <p className="meeting-big">| 만나는 장소 </p>
                        <p className="meeting-small">{meeting.location}</p>
                    </div>

                    <div className="space-30px"></div>

                    <div className="meeting-host">
                        <p className="meeting-big">| 만남 주최자 </p>
                        <p className="meeting-small">{meeting.host}</p>
                    </div>

                    <div className="space-30px"></div>

                    <div className="meeting-host">
                        <p className="meeting-big">| 만남에 참여하는 사람들 </p>
                        <p className="meeting-small">{meeting.members.join(', ')}</p>
                    </div>
                    
                    <div className="space-30px"></div>

                    <div className="meeting-content">
                        <p className="meeting-big">| 만남을 마음껏 소개해주세요.</p>
                        <p className="meeting-small meeting-contentarea">{meeting.content}</p>
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

export default Meeting;