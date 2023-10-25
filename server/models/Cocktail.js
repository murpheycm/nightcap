const { Schema, model } = require('mongoose');

const Review = require('./Review');
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
    reviews: [Review],
    tags: [tagSchema],
});

const Cocktail = model('Cocktail', cocktailSchema);

module.exports = Cocktail;