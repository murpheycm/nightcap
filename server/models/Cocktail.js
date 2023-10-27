const { Schema, model } = require('mongoose');

const Review = require('./Review');
const tagSchema = require('./Tags');

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
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
});

const Cocktail = model('Cocktail', cocktailSchema);

module.exports = Cocktail;