// import img from "../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookCard({ id }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/book/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BookPageItem book={book} />
    </div>
  );
}

function BookPageItem({ book }) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg')
      .then(response => response.blob())
      .then(data => {
        const imgUrl = URL.createObjectURL(data);
        setImg(imgUrl);
      })
      .catch(error => console.log(error));
  }, []);

  if (!img) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure><img src={img} alt='Book' /></figure>
      <div className='card-body'>
        <h2 className='card-title'>{book.title}</h2>
        <p>{book.genre}</p>
        <div className='card-actions justify-end'>
          <Link to={`/books/${book.id}`} className='btn btn-primary'>Rent Now</Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;