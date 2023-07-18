import React, { useEffect, useState } from 'react';

import BookCard from "../components/BookCard";

function BookOverviewPage() {
  const [bookList, setBookList] = useState();

  useEffect(() => {fetch(`http://localhost:3000/book/simple`)
    .then(response => response.json())
    .then(data => setBookList(data))
    .catch(error => console.log(error));
  }, []);

  if (!bookList) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const idList = []
  for (let i = 0; i < bookList.length; i++) {
    const book = bookList[i];
    idList.push(book.id);
  }

  console.log(idList);

  return (
      <div className="grid grid-cols-3 flex-wrap gap-4">
        {idList.map(id => (
          <div className="grid-item ml-5" key={id}>
            <BookCard id={id} />
          </div>
        ))}
      </div>
  );
}

export default BookOverviewPage;