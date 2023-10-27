const { Schema, model } = require('mongoose');

const Review = require('./Review');
const Tag = require('./Tag');
const Business = require('./Business');

const cocktailSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true, // should this be required?
    },
    ingredients: [String],
    allergens: [String],
    reviews: [Review],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    business: { type: Schema.Types.ObjectId, ref: 'Business' },
    image: String, 
},
  {
    toJSON: { virtuals: true },
    // toObject: { virtuals: true },
});

cocktailSchema.virtual('averageRating').get(function () {
    // Calculate the average rating from associated reviews
    if (this.reviews.length === 0) {
      return 0;
    }
  
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / this.reviews.length;
  });

const Cocktail = model('Cocktail', cocktailSchema);

module.exports = Cocktail;