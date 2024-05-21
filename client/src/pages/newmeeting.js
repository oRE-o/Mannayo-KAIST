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
        // if (!ID || !PW) {
        //     window.alert('아이디, 비밀번호를 모두 입력해주세요.');
        // }

        // try {
        //     await axios.post(APIURL+'/users/login', { userID: ID, password: PW });
        //     console.log('Login successful:');
        //     // 로그인 성공 시 다음 동작 수행 (예: 리다이렉트)
        //     navigate("/dashboard");
        //   } catch (err) {
        //     console.error('Error logging in:');
        //     if (err.response.status === 401) {
        //         window.alert('아이디나 비밀번호가 다릅니다.');
        //       } else {
        //         window.alert('오류가 발생했습니다.');
        //         console.log(err.response);
        //     }
        //   }
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

                    <input type="submit" value="출발" className="meeting-submit" onClick={(e) => {}}></input>
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