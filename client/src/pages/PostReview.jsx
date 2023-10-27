import React from 'react';

const PostReview = () => {
  return (
    <div className="post-review-placeholder">
      <h2>Write a Review</h2>
      <form>
        <div className="form-group">
          <label htmlFor="cocktailName">Cocktail Name</label>
          <input type="text" id="cocktailName" name="cocktailName" />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input type="number" id="rating" name="rating" min="1" max="5" />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea id="review" name="review" rows="4" />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PostReview;