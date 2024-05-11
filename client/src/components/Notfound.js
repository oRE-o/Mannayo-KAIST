import React from "react";
import bocchi from "./bocchi.mp4";
const NotFoundVideo = () => {
    return (
        <video src={bocchi} autoPlay muted loop> </video>

    );
}

export default NotFoundVideo;