import React from 'react';
import SearchBar from './SearchBar';

function TagSearch({ tags }) {
  const tagNames = tags.map(tag => tag.name);
  const searchData = tagNames;

  return (
    <div className="App">
      <SearchBar placeholder="Search for tags..." data={searchData} />
    </div>
  );
}

export default TagSearch;