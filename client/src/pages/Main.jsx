import React from 'react';
import { Link } from 'react-router-dom';
import UserProfilePicture from './UserProfilePicture'; // Component for user profile picture
import MainSearch from '../components/MainSearch';
const MainPage = () => {
  return (
    <div>
      <header>
        <div className="header-top">
          <h1>NIGHTCAP</h1>
          <Link to="/home">
            <UserProfilePicture user={currentUser} />
          </Link>
        </div>
        <div className="main-search-bar">
          <MainSearch />
        </div>
      </header>
      <main>
        {/* Render the content based on the current link */}
      </main>
    </div>
  );
};

export default MainPage;