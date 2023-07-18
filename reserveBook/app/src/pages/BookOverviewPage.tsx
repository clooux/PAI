import React from 'react';

import BookCard from "../components/BookCard";

function BookOverviewPage() {
  return (
      <div className="grid grid-cols-3 flex-wrap gap-4">
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
        <div className="grid-item ml-5">
          <BookCard />
        </div>
      </div>
  );
}

export default BookOverviewPage;