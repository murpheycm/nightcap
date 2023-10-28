const db = require('./connection');
const { User, Cocktail, Comment, Reaction } = require('../models');
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

  const comments = await Comment.insertMany([
    {
      author: user._id,
      date: Date.now(),
      comment:
        'A delicious concotion!',
      cocktail: cocktails[0]._id,
    },
    {
      author: user._id,
      date: Date.now(),
      comment:
        'A delicious concotion!',
      cocktail: cocktails[0]._id,
    },
  ]);

  console.log('comments seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
