import React, { useEffect, useState } from 'react';

function UserPage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/user/5')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="">{user.orders}</h1>
    </div>
  );
}

export default UserPage;
