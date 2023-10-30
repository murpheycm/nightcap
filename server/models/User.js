const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Review = require('./Review');
const Profile = require('./Profile');
const Cocktail = require('./Cocktail');
const Business = require('./Business');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
    badges: [{
      type: Schema.Types.ObjectId,
      ref: 'Badge',
    }],
    likedBusinesses: [{
      type: Schema.Types.ObjectId,
      ref: 'Business',
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
    cocktails: [{
      type: Schema.Types.ObjectId,
      ref: 'Cocktail',
    }],  
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friends',
      }]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

const User = model('User', userSchema);

module.exports = User;
