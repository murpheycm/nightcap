import React from 'react';

const Cocktails = () => {
  return (
    <div className="cocktail-placeholder">
      <h2>Cocktail Name</h2>
      <p>Description of the cocktail goes here.</p>
      <ul>
        <li>Ingredient 1</li>
        <li>Ingredient 2</li>
        <li>Ingredient 3</li>
        {/* Add more ingredients as needed */}
      </ul>
      <button>View Recipe</button>
    </div>
  );
};

export default Cocktails;