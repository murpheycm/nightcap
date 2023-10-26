<<<<<<< HEAD
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
=======
import React, { useState } from 'react';
import UserReviews from '../components/UserReviews';

function FriendReviews({ review }) {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCloseCommentForm = () => {
    setShowCommentForm(false);
  };

  return (
    <div>
        <div>
        <UserReviews
        review={review}
            onCommentSubmit={handleCommentSubmit}
            isFriendsReviews={true}
            username={review.username}
        />
        </div>
        <div>

        </div>
    </div>
  );
}

export default FriendReviews;
>>>>>>> c87f5d4bfddbb1226647cdc7e8bb9f278bc3b03b
