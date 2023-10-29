import React from 'react';
import { Link } from 'react-router-dom';

function Badges({ badges, userId }) {
  // Display up to six badges
  const displayedBadges = badges.slice(0, 6);

  return (
    <div className="badge-section">
      <h3>Badges</h3>
      <div className="badge-list">
        {displayedBadges.map((badge) => (
          <img key={badge.id} src={badge.image} alt={badge.name} />
        ))}
      </div>
      {badges.length > 6 && (
        <Link to={`/user/${userId}/badges`}>See All Badges</Link>
      )}
    </div>
  );
}

export default Badges;