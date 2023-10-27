import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useUserContext } from '../../utils/GlobalState'; // Import the context hook
import {
  QUERY_FRIEND_REVIEWS,
  QUERY_USER_REVIEWS,
} from '../../utils/queries';

function UserReviews({ review, onCommentSubmit, isFriendsReviews, username }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const query = isFriendsReviews ? QUERY_FRIEND_REVIEWS : QUERY_USER_REVIEWS;

  // Use the context hook to access global state and dispatch actions
  const [state, dispatch] = useUserContext();

  const { loading, data } = useQuery(query, {
    variables: { username },
  });

  useEffect(() => {
    if (!loading && data) {
      setReviews(data.getFriendsReviews || data.getUserReviews);
    }
  }, [loading, data, isFriendsReviews]);

  const handleCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    // Dispatch an action to add the comment to the global state
    dispatch({
      type: 'ADD_COMMENT',
      comment: {
        text: comment,
        username: state.username,
      },
    });

    onCommentSubmit(comment);
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
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.username} enjoyed {review.review.cocktail.name} on {review.dateCreated}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReviews;