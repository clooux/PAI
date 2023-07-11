import React from "react";
import img from "../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg"
import '../styles/bookOverview.css'
function BookPageItem() {
    return <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={img} alt="Book"/></figure>
        <div className="card-body">
            <h2 className="card-title">Book</h2>
            <p>Lorem ipsum dolor sit amet</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
}

function BookOverviewPage() {
    return <div className="books-overview-wrapper">
        <div className="grid-container">
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
            <div className="grid-item">{BookPageItem()}</div>
        </div>
    </div>;
}

export default BookOverviewPage;
