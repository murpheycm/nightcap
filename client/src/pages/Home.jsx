import React, { useState } from 'react';

function FriendReview({ review }) {
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
        {/* Render review content */}
        <p>{review.username} is enjoying {review.review.cocktail.name} at {review.review.cocktail.business.name}</p>
        <p>Rating: {review.review.rating}</p>
        <p>Date: {review.review.date}</p>

        {/* Render Comment button */}
        <button onClick={handleCommentClick}>Comment</button>
      </div>

      {/* Render comment form */}
      {showCommentForm && (
        <div>
          <form>
            <textarea placeholder="Write your comment..." />
            <button type="submit">Submit Comment</button>
            <button onClick={handleCloseCommentForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FriendReview;