import React from 'react';
import SearchBar from '../SearchBar';

function MainSearch({ users, businesses, cocktails, tags }) {
  const businessNames = businesses.map(business => business.name);
  const cocktailNames = cocktails.map(cocktail => cocktail.name);
  const tagNames = tags.map(tag => tag.name);
  const userNames = users.map(user => user.username);
  const fullNames = users.map(user => `${user.profile.firstName} ${user.profile.lastName}`);
  const searchData = [...businessNames, ...cocktailNames, ...tagNames, ...userNames,...fullNames];

  return (
    <div className="App">
      <SearchBar placeholder="Search for users, businesses, cocktails, or tags..." data={searchData} />
    </div>
  );
}

export default MainSearch;