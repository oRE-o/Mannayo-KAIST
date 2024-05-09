import React from "react";
import "./css/MeetingCard.css"
const MeetingCard = () => {
    return (
        <div className="meeting-card">
            <div className="meeting-name">✦ 극장판 스파이 패밀리: 코드 화이트 시청</div>
            <hr></hr>
            <div className="meeting-time"><span className="bold">2024년 2월 14일 화요일, AM 10:00</span></div>
            <div className="meeting-location"><span className="bold">"메가박스 대전 유성"</span> 에서</div>
            <div className="space-15px"></div>
            <div className="meeting-admin"><span className="bold">최용혁</span>님이 개설함</div>
            <div className="meeting-member">유우카, 검은 양복 외 168명이 함께함</div>
        </div>
    );
}

export default MeetingCard;