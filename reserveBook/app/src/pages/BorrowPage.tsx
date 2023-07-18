import React, { useEffect } from 'react';
import { useState } from 'react';
import img from '../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg';
import { Link } from 'react-router-dom';


function BorrowPage() {

  const [returnDate, setReturnDate] = useState('');
  const [startDate, setStartDate] = useState('');

  const currentUrl = window.location.href;
  const urlParts = currentUrl.split('=');
  const bookId = urlParts.pop();
  const [book, setBook] = useState(null);


  const calculateStartReturnDates = () => {
    const start = new Date();
    const startMonth = start.getMonth();
    const startYear = start.getFullYear();
    const startDay = start.getDate();
    const startDate = new Date(startYear, startMonth, startDay);
    setStartDate(startDate.toDateString());

    const midDate = new Date(startDate);
    const returnMonth = midDate.getMonth() + 1;
    const returnYear = midDate.getFullYear();
    const returnDay = midDate.getDate();
    const returnDate = new Date(returnYear, returnMonth, returnDay);
    setReturnDate(returnDate.toDateString());
  }

  const handleRentRequest = ( book:number ) => {
    console.log(book)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/book/${bookId}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.log(error));
  }, [bookId]);

  useEffect(() => {
    calculateStartReturnDates();
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  return <div className='book-page'>
    <div className='book-details'>
      <h1 className='book-title text-center text-4xl'>{book.title}</h1>
      <div className="flex space-x-4 mt-10">
        <img src={img} alt='Book Cover' className='book-cover w-1/3 ml-5' />
        <div className='book-trivia w-2/3 mt-20 flex flex-col justify-center items-center ml-15'>
          <p>Start Date: {startDate}</p>
          <p className="mt-10 items-center">Return Date: {returnDate}</p>
          <button onClick={() => handleRentRequest(book.id)} className='btn btn-primary flex justify-center items-center mt-10'>Rent</button>
        </div>
      </div>
    </div>
  </div>
}

export default BorrowPage