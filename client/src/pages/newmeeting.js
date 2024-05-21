import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { APIURL } from "../tools/api";
import { useNavigate } from "react-router-dom";
import "./css/newMeeting.css";


const NewMeeting = () => {
    const navigate = useNavigate();
   
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(APIURL + '/status' , { withCredentials: true });
                if (!response.data.isAuthenticated) {
                    window.alert('새로운 만남을 게시하고 싶다면 로그인해주세요.');
                    navigate("/dashboard"); // 이미 로그인 되어 있다면 대시보드로 리다이렉트
                }
            } catch (error) {
                console.error('Failed to check auth status:', error);
            }
        };
        checkAuthStatus();
        console.log('로그인인증했음');
    }, [navigate]);


    const [ meetingName, setMeetingName ] = React.useState();
    const [ startTime, setStartTime ] = React.useState();
    const [ endTime, setEndTime ] = React.useState();
    const [ location, setLocation ] = React.useState();
    const [ content, setContent ] = React.useState();
    
    const newMeetingCreate = async () => {
        if (!meetingName || !startTime || !endTime || !location || !content) {
            return window.alert('입력되지 않은 곳이 있어요! 모두 입력해주세요.');
        }

        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        if (start < now) {
            return window.alert('시작 시간이 현재 시간보다 빠릅니다.');
        }

        if (end < start) {
            return window.alert('종료 시간이 시작 시간보다 빠릅니다.');
        }

        if (start > oneYearFromNow || end > oneYearFromNow) {
            return window.alert('시작 시간과 종료 시간은 현재로부터 1년 이내의 시간이어야 합니다.');
        }


        try {
            await axios.post(APIURL+'/meeting/new', { meetingName, startTime, endTime, location, content }, { withCredentials: true });
            window.alert('성공적으로 만남이 생성되었어요!');
            navigate("/find");

          } catch (err) {
            console.error('Error creating meeting:', err);
            if (err.response.status === 401) {
                window.alert('유저 인증 오류가 발생했습니다. 재 로그인 후 진행해주세요.');
            } else if (err.response.status === 400) {
                window.alert('이미 같은 이름의 만남이 존재합니다. 이름을 변경해주세요.');
            } else {
                window.alert('오류가 발생했습니다.');
                console.log(err.response);
            }
          }
          return;
    };

    return (
        <>
            <Header/>
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="title-button-wrapper">
                    <div className="title-wrapper">
                        <div className="small-title">HOST MEETING</div>
                        <div className="greetings">| 당신의 만남을 만들어보세요.</div>
                        <div className="greetings">| 성공적인 만남이 성사되길 바래요!</div>
                    </div>
                </div>
                <div className='space-50px'></div>
                
                <div className="newmeeting-wrapper">
                    <div className="meeting-id">
                        <p className="meeting-ex">| 만남의 이름을 입력해주세요.</p>
                        <input className="meeting-input" type="text" placeholder="Meeting Name" value={meetingName} onChange={(e) => setMeetingName(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="meeting-start">
                        <p className="meeting-ex">| 만남의 시작 시간을 입력해주세요.</p>
                        <input className="meeting-input datetime-selector" type="datetime-local"value={startTime} onChange={(e) => setStartTime(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="meeting-end">
                        <p className="meeting-ex">| 만남의 종료 시간을 입력해주세요.</p>
                        <input className="meeting-input datetime-selector" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="meeting-end">
                        <p className="meeting-ex">| 만남의 장소를 입력해주세요.</p>
                        <input className="meeting-input" type="text" placeholder="대전 유성구 대학로 291 소망관" value={location} onChange={(e) => setLocation(e.target.value)}></input>
                    </div>

                    <div className="space-30px"></div>
                    
                    <div className="meeting-end">
                        <p className="meeting-ex">| 만남을 마음껏 소개해주세요.</p>
                        <textarea className="meeting-input-large" type="text" placeholder="추가적으로 만남에 어울리는 사람을 적거나,&#13;&#10;구체적인 만남의 내용 등을 적어주세요!" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <input type="submit" value="출발" className="meeting-submit" onClick={(e) => {newMeetingCreate()}}></input>
                </div>



                <div className='space-50px'></div>
                <div className="list-wrapper">
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default NewMeeting;