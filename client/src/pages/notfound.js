import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotFoundVideo from "../components/Notfound";

const PageNotFound = () => {
    return (
        <>
            <Header />
            <div className="main-content-wrapper">
                <div className='space-100px'></div>
                <div className="small-title">404 Not Found...</div>
                <div className="greetings">| 당신은 막다른 길에 당도했다.</div>
                <div className="greetings">| @oreothecream</div>
                <div className='space-50px'></div>
                <NotFoundVideo />
                <div className='space-50px'></div>
            </div>
            <Footer />
        </>
    );
}

export default PageNotFound;