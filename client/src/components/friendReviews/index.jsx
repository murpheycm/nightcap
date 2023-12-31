import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FRIEND_REVIEWS } from '../utils/queries'; // Import your GraphQL query

function FriendReview({ review, onCommentSubmit }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [friendReviews, setFriendReviews] = useState([]); // New state variable for friend reviews

  const { loading, data } = useQuery(QUERY_FRIEND_REVIEWS, {
    // Pass any needed variables here
  });

  useEffect(() => {
    if (!loading && data) {
      // Assuming data.friendReviews is an array of friend reviews
      setFriendReviews(data.friendReviews);
    }
  }, [loading, data]);

  const handleCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    onCommentSubmit(comment); // Notify the parent component about the new comment
    setShowCommentForm(false);
    setComment('');
  };

  const handleCloseCommentForm = () => {
    setShowCommentForm(false);
  };

  return (
    <div>
      <div>
        <p>
          {review.username} is enjoying {review.review.cocktail.name} at{' '}
          {review.review.cocktail.business.name}
        </p>
        <p>Rating: {review.review.rating}</p>
        <p>Date: {review.review.date}</p>

        <button onClick={handleCommentClick}>Comment</button>
      </div>

      {showCommentForm && (
        <div>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <button type="submit">Submit Comment</button>
            <button onClick={handleCloseCommentForm}>Cancel</button>
          </form>
        </div>
      )}

      <div>
        {friendReviews.map((friendReview) => (
          <div key={friendReview.id}>
            <p>{friendReview.username}'s review of {friendReview.review.cocktail.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendReview;