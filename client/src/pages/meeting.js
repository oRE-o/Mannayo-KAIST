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

    const joinMeeting = async () => {
        try {
            const response = await axios.post(APIURL+'/meeting/join', { meetingID: meetingId });
            if (response.status === 200) {
              window.alert('성공적으로 만남에 합류했어요 :)');
            }
          } catch (error) {
            if (error.response) {
              if (error.response.status === 400) {
                window.alert('이미 이 만남에 들어왔어요!');
              } else if (error.response.status === 401) {
                window.alert('로그인 후 만남에 참여하실 수 있습니다!');
              } else {
                window.alert('Internal server error');
              }
            } else {
                window.alert('Failed to join meeting');
            }
          }
        };

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
        window.location.href = "/404";
        return;
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
                        <p className="meeting-big">| 만남 소개</p>
                        <p className="meeting-small meeting-contentarea">{meeting.content}</p>
                    </div>

                    <input type="submit" value="모임 참여하기" className="meeting-submit" onClick={(e) => {joinMeeting()}}></input>
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