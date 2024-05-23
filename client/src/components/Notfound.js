import React from "react";
import { APIURL } from "../tools/api";
const NotFoundVideo = () => {
    return (
        <video src={APIURL+'/static/bocchi.mp4'} autoPlay muted loop> </video>

    );
}

export default NotFoundVideo;