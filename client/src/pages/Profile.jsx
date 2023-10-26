import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../path-to-your-queries';

const Profile = ({ username }) => {
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  return (
    <div>
      <div>
        <img src={user.profile.profileImage} alt="User Profile" />
        <h2>{user.username}</h2>
        <p>Name: {`${user.profile.firstName} ${user.profile.lastName}`}</p>
        <p>Email: {user.email}</p>
      </div>

      <div>
        <h3>Recent Reviews</h3>
        {user.reviews.map((review) => (
          <div key={review._id}>
            <img src={user.profile.profileImage} alt="User Profile" />
            <p>
              My full name is enjoying {review.cocktail.name} at {review.business} with a rating of {review.rating}.
            </p>
            <div>
              <button onClick={() => handleComment(review._id)}>Comment</button>
              <button onClick={() => handleToast(review._id)}>Toast</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;