import React from 'react';
import SearchBar from './SearchBar';

function CocktailSearch({ cocktails, tags }) {
  const cocktailNames = cocktails.map(cocktail => cocktail.name);
  const tagNames = tags.map(tag => tag.name);
  const searchData = [...cocktailNames, ...tagNames];

  return (
    <div className="App">
      <SearchBar placeholder="Search for cocktails or tags..." data={searchData} />
    </div>
  );
}

export default CocktailSearch;