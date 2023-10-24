const { Schema, model } = require('mongoose');

const reviewSchema = require('./Review');
const tagSchema = require('./Tag');

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
    reviews: [reviewSchema],
    tags: [tagSchema],
});

const Cocktail = model('Cocktail', cocktailSchema);

module.exports = Cocktail;