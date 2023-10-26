import React from 'react';

const UserProfilePicture = ({ user }) => {
  const { profileImage, username } = user;

  return (
    <div className="user-profile-picture">
      <img src={profileImage} alt={`${username}'s profile`} />
    </div>
  );
};

export default UserProfilePicture;