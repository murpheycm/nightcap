import React from 'react';
import SearchBar from './SearchBar';

function UserSearch({ users }) {
  const userData = users.map(user => {
    const fullName = `${user.firstname} ${user.lastname}`;
    return {
      username: user.name,
      fullName: fullName,
    };
  });

  return (
    <div className="App">
      <SearchBar placeholder="Search for users..." data={userData} />
    </div>
  );
}

export default UserSearch;