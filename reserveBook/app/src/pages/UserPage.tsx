// import React, { useEffect, useState } from 'react';

function UserPage() {

  // const [user, setUser] = useState(null);
  //
  // useEffect(() => {
  //   fetch('http://localhost:3000/user/5')
  //     .then(response => response.json())
  //     .then(data => setUser(data))
  //     .catch(error => console.log(error));
  // }, []);

  // if (!user) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

  const user = {
    firstName: 'Lorem',
    lastName: 'Ipsum',
  };

  const borrowedBooks = [
    { id: 1, title: 'Book 1', returnDate: '2023-08-15' },
    { id: 2, title: 'Book 2', returnDate: '2023-08-20' },
    { id: 3, title: 'Book 3', returnDate: '2023-08-25' },
  ];

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl text-center mb-5">{user.firstName} {user.lastName}</h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <h2 className="text-lg font-medium bg-gray-100 py-2 px-4">Rented Books</h2>
        <ul className="divide-y divide-gray-200">
          {borrowedBooks.map(book => (
            <li key={book.id} className="py-3 px-4 flex justify-between">
              <span>{book.title}</span>
              <span className="text-gray-500">Date Due: {book.returnDate}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default UserPage;
