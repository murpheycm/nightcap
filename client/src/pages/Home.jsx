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