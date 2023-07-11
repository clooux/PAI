import React from 'react'
import img from "../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg"
import '../styles/bookPage.css'

function BookPage() {
    return <div className="book-page">
        <div className="book-details">
            <h1 className="book-title">Clean Code - A Handbook of Agile Software Craftsmanship</h1>
            <img src={img} alt="Book Cover" className="book-cover"/>
            <div className="book-trivia">
                <p className="book-author">R. C. Martin</p>
                <p className="book-desc">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                </p>
                <button className="btn btn-warning rent-btn">Rent</button>
            </div>
        </div>

    </div>
}

export default BookPage

