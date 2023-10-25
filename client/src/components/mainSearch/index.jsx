import React from 'react';
import SearchBar from './SearchBar';

function MainSearch({ users, businesses, cocktails, tags }) {
  const businessNames = businesses.map(business => business.name);
  const cocktailNames = cocktails.map(cocktail => cocktail.name);
  const tagNames = tags.map(tag => tag.name);
  const searchData = [...businessNames, ...cocktailNames, ...tagNames];

  return (
    <div className="App">
      <SearchBar placeholder="Search for users, businesses, cocktails, or tags..." data={searchData} />
    </div>
  );
}

export default MainSearch;