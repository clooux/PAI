import React, { useEffect, useState } from 'react';
import img from '../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg';
import { Link } from 'react-router-dom';

function BookPage() {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split('/');
  const lastPart = urlParts.pop();
  // console.log(lastPart)

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/book/${lastPart}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.log(error));
  }, [lastPart]);

  if (!book) {
    return <div>Loading...</div>;
  }

   return <div className='book-page'>
    <div className='book-details'>
      <h1 className='book-title text-center text-4xl'>{book.title}</h1>
      <div className="flex space-x-4 mt-10">
        <img src={img} alt='Book Cover' className='book-cover w-1/3' />
        <div className='book-trivia w-2/3 mt-20 items-center'>
          <p className='book-author'>{book.author}</p>
          <p className='book-desc'>{book.description}</p>
          <Link to={`/borrow`} className='btn btn-primary flex justify-center items-center'>Rent</Link>
        </div>
      </div>
    </div>

  </div>;
}

export default BookPage;

