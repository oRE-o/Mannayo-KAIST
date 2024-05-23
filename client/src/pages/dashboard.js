import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MeetingCard from "../components/MeetingCard";
import "./css/dashboard.css";
import { APIURL } from '../tools/api';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const [username, setUsername] = useState();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(APIURL + '/status' , { withCredentials: true });
                if (!response.data.isAuthenticated) {
                    window.alert('만남에 참여하고 싶다면, 로그인해주세요.');
                    navigate("/find"); // 이미 로그인 되어 있다면 대시보드로 리다이렉트
                }
            } catch (error) {
                console.error('Failed to check auth status:', error);
            }
        };
        checkAuthStatus();
    }, [navigate]);

    useEffect(() => {

        const fetchUsername = async () => {
            try {
                const response = await axios.get(APIURL + '/users/get',{ withCredentials: true });
                setUsername(response.data.username);
            } catch (error){
                console.error('failed to fetch name', error);
            }  
        }
        const fetchMeetings = async () => {
            try {
                const response = await axios.post(APIURL + '/meeting/get', {userSearch: 1},{ withCredentials: true });
                setMeetings(response.data);
            } catch (error) {
                console.error('Failed to fetch meetings:', error);
            }
        };
        fetchUsername();
        fetchMeetings();
    }, []);

    

    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="title-button-wrapper">
                    <div className="title-wrapper">
                        <div className="small-title">DASHBOARD</div>
                        <div className="greetings">| 안녕하세요, {username}님!</div>
                        <div className="greetings">| 현재 예정된 만남이 {meetings.length}개 있습니다.</div>
                    </div>
                </div>
                <div className='space-50px'></div>
                <div className="list-wrapper">
                    {meetings.map(meeting => (
                        <MeetingCard
                            meetingID={meeting.meetingID}
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

export default Dashboard;