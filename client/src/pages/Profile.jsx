<<<<<<< HEAD
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
=======
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import UserReviews from '../components/UserReviews';

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
        <h2>{`${user.profile.firstName} ${user.profile.lastName}`}</h2>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>

      <div>
        <UserReviews
            review={user.reviews}
            onCommentSubmit={handleCommentSubmit}
            isFriendsReviews={false}
            username={user.username}
        />
      </div>
    </div>
  );
};

export default Profile;
>>>>>>> c87f5d4bfddbb1226647cdc7e8bb9f278bc3b03b
