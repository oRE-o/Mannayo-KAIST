import React from "react";
import "./css/MeetingCard.css"
const MeetingCard = ({ meetingName, startTime, location, host, members }) => {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', options);
    };

    const renderMembers = (members) => {
        if (members.length > 2) {
            return `${members.slice(0, 2).join(', ')} 외 ${members.length - 2}명`;
        }
        return `${members.join(', ')}, ${members.length}명`;
    };

    return (
        <div className="meeting-card">
            <div className="meeting-name">✦ {meetingName}</div>
            <hr></hr>
            <div className="meeting-time"><span className="bold">{formatDate(startTime)}</span></div>
            <div className="meeting-location"><span className="bold">{location}</span> 에서</div>
            <div className="space-15px"></div>
            <div className="meeting-admin"><span className="bold">{host}</span>님이 개설함</div>
            <div className="meeting-member">{renderMembers(members)}이 함께함</div>
        </div>
    );
}

export default MeetingCard;