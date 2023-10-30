import { useQuery } from '@apollo/client';
import { useState } from 'react';

import UserReviews from '../components/UserReviews'; // Import UserReviews component

function Home() {
  // Fetch friends' recent reviews data, e.g., using a GraphQL query

  return (
    <div>
      <h2>Friends Recent Reviews</h2>
        <UserReviews
          key={review.id}
          review={review}
          isFriendsReviews={true}
          username={review.username}
        />
    </div>
  );
}

export default Home;
