import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../utils/GlobalState';
import { ADD_COMMENT } from '../../utils/action'; 
import { FaGlassMartini } from'react-icons/fa';

function UserReviews({ type, review, comments, loading, cheers }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 100;
  const reviewsPerPage = 15;
  const [visibleReviews, setVisibleReviews] = useState(reviewsPerPage);

  // Use the context hook to access global state and dispatch actions
  const [state, dispatch] = useUserContext();

  function renderArticle(camelCasedWord) {
    const startsWithVowel = /^[aeiou]/i.test(camelCasedWord);
    return startsWithVowel ? "an" : "a";
  }

  function renderCocktailDescription(cocktail) {
    const article = renderArticle(cocktail.name);

    return (
      <p>
        {cocktail.user.fullname} enjoyed {article} {cocktail.name} at{' '}
        {cocktail.business.name}
      </p>
    );
  }

  const handleCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentChange = (event) => {
    const text = event.target.value;
    setComment(text);
    setCharCount(text.length);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Dispatch an action to add the comment to the global state
    dispatch({
      type: ADD_COMMENT,
      comment: {
        reviewId: state.review._id,
        userId: state.user._id,
        text: comment
      },
    });
    setShowCommentForm(false);
    setComment('');
    setCharCount(0);
  };

  const handleCloseCommentForm = () => {
    setShowCommentForm(false);
    setCharCount(0);
  };

  const handleCheersClick = () => {
    if (cheers) {
      dispatch({
        type:'REMOVE_CHEERS',
        reviewId: review.id,
      });
    } else {
      dispatch({
        type:'ADD_CHEERS',
        reviewId: review.id,
      });
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + reviewsPerPage);
  };

  const renderReviews = (reviews) => {
    return reviews.slice(0, visibleReviews).map((review) => (
      <div key={review.id}>
        {renderCocktailDescription(review.review.cocktail)}
        <p>Rating: {review.review.rating}</p>
        <p>Date: {review.review.date}</p>
        <button onClick={handleCommentClick} disabled={showCommentForm}>
          Comment
        </button>
        <button onClick={handleCheersClick} style={{ background: cheers ? 'yellow' : 'grey' }}>
          <FaGlassMartini /> {' '} Cheers
        </button>
      </div>
    ));
  };

  return (
    <div>
      <div>
        {type === 'cocktail' && renderReviews(cocktailReviews)}
        {type === 'friends' && renderReviews(friendReviews)}
        {type === 'user' && renderReviews(userReviews)}

        {showCommentForm && (
          <div>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
              />
              <div>
                {charCount}/{maxCharCount}
                <button type="submit">Submit Comment</button>
                <button onClick={handleCloseCommentForm}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div>
        {visibleReviews < reviews.length && (
          <button onClick={loadMoreReviews}>Show More</button>
        )}
      </div>
    </div>
  );
}

export default UserReviews;