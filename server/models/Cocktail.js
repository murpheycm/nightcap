const mongoose = require('mongoose');

const { Schema } = mongoose;

const cocktailSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;
