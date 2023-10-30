const db = require('./connection');
const { User, Cocktail, Review, Comment, Cheers } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Cocktail', 'cocktails');
  await cleanDB('Comment', 'comments');
  await cleanDB('Reaction', 'reactions');
  await cleanDB('User', 'users');

  const cocktails = await Cocktail.insertMany([
    { name: 'Gin' },
    { name: 'Whiskey' },
    { name: 'Scotch' },
    { name: 'Vodka' },
    { name: 'Tequeila' },
    { name: 'Rum' },
    { name: 'Brandy' },
    { name: 'Schnapps' },
    { name: 'Vermouth' },
    { name: 'Amaretto' },
    { name: 'Cognac' },
    { name: 'Absinthe' },
    { name: 'Sake' },
  ]);
  console.log('cocktails seeded');


  const reviews = await Review.insertMany([
    {
      user: user._id,
      cocktail: cocktails[0]._id,
      title: 'Gin and Lime',
      text: 'A wonderful cocktail and simple!',
      rating: 3,
      image: '',
      comments: [],
      cheers: [],
      createdAt: Date,
    },
    {
      user: user._id,
      cocktail: cocktails[0]._id,
      title: 'Stormy Weather',
      text: 'Not for the faint of heart!',
      rating: 5,
      image: '',
      comments: [],
      cheers: [],
      createdAt: Date,
    },
  ]);
  console.log('comments seeded');


  await User.create({
    firstName: 'Jon',
    lastName: 'Doe',
    email: 'jon@testmail.com',
    password: 'password123',
  });

  await User.create({
    firstName: 'mack',
    lastName: 'murph',
    email: 'mack@testmail.com',
    password: 'password123'
  });

  console.log('users seeded');

  process.exit();
});
