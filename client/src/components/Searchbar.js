import React from "react";
import "./css/Searchbar.css"
const Searchbar = () => {
    const [ StartTime, setStartTime ] = React.useState("");
    const [ EndTime, setEndTime ] = React.useState("");

    React.useEffect( ()=>{
        console.log(StartTime, EndTime);
    },[StartTime, EndTime]);

    return (
        <>
            <div className="searchbar-wrapper">  
                <div className="part-title">| 참여 가능 시간으로 검색해보세요.</div>
                <input type="datetime-local" className="datetime-selector" value={StartTime} onChange={e => setStartTime(e.target.value)}></input>
                <span className="search-ex">부터, </span>
                <input type="datetime-local" className="datetime-selector" value={EndTime} onChange={f => setEndTime(f.target.value)}></input>
                <span className="search-ex">까지의 만남을 찾습니다.</span>
            </div>
        </>   
    );
}

export default Searchbar;