import React from "react";
import img from "../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg"
import '../styles/homepage.css'
function HomePage() {
    return <div>
        <div className="front-screen-title">
            <h1>reserveBook</h1>
            <h2>rent or buy a book!</h2>
        </div>

        <div className="carousel-wrapper">
            <div className="carousel carousel-center rounded-box">
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
                <div className="carousel-item">
                    <img src={img} alt="Book"/>
                </div>
            </div>
        </div>
    </div>
}

export default HomePage;
