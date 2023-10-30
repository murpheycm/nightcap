const db = require('./connection');
const { User, Cocktail, Allergen, Tag, Comment, Reaction } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Cocktail', 'cocktails');
  await cleanDB('Comment', 'comments');
  await cleanDB('Reaction', 'reactions');
  await cleanDB('User', 'users');
  await cleanDB('Allergen', 'allergens');
  await cleanDB('Tag', 'tags');

  const tags = await Tag.insertMany([
    { name: 'Mild' },
    { name: 'Moderate' },
    { name: 'Severe' },
    { name: 'Spicy' },
    { name: 'Fun' },
    { name: 'Fresh' },
    { name: 'Sweet' },
    { name: 'Sour' },
    { name: 'Sweet & Sour' },
    { name: 'Sour & Sweet' },
    { name: 'Other' },
  ]);

  console.log('tags seeded');

  const allergens = await Allergen.insertMany([
      { name: 'Gluten' },
      { name: 'Peanuts' },
      { name: 'Shellfish' },
      { name: 'Soy' },
      { name: 'Dairy' },
      { name: 'Egg' },
      { name: 'Fruit' },
      { name: 'Barley' },
      { name: 'Grapes' },
      { name: 'Rye' },
      { name: 'Hops' },
      { name: 'Histamines' },
  ]);

  console.log('allergens seeded');

  // const comments = await Comment.insertMany([
  //   {
  //     author: user._id,
  //     date: Date.now(),
  //     comment:
  //       'A delicious concotion!',
  //     cocktail: cocktails[0]._id,
  //   },
  //   {
  //     author: user._id,
  //     date: Date.now(),
  //     comment:
  //       'A delicious concotion!',
  //     cocktail: cocktails[0]._id,
  //   },
  // ]);

  console.log('comments seeded');

  //  await User.create({
  //   username: 'pwashington',
  //   email: 'pamela@testmail.com',
  //   firstName: 'Pamela',
  //   lastName: 'Washington',
  //   password: 'password12345',
  // });

  // await User.create({
  //   username: 'eholt',
  //   email: 'eholt@testmail.com',
  //   firstName: 'Elijah',
  //   lastName: 'Holt',
  //   password: 'password12345'
  // });

  // const cocktails = await Cocktail.insertMany([
  //   { name: 'Gin', userId: 1 },
  //   { name: 'Whiskey', userId: 1 },
  //   { name: 'Scotch', userId: 1 },
  //   { name: 'Vodka', userId: 1 },
  //   { name: 'Tequeila', userId: 1 },
  //   { name: 'Rum', userId: 1 },
  //   { name: 'Brandy', userId: 2 },
  //   { name: 'Schnapps', userId: 2 },
  //   { name: 'Vermouth', userId: 2 },
  //   { name: 'Amaretto', userId: 2 },
  //   { name: 'Cognac', userId: 2 },
  //   { name: 'Absinthe', userId: 2 },
  //   { name: 'Sake', userId: 2 },
  // ]);

  console.log('cocktails seeded');

  console.log('users seeded');

  process.exit();
});
