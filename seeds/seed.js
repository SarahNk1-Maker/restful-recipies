//Script to seed the databased using the adjacent .json files. We can test some data this way without needing a front end.
const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of recipeData) {
  // Use the user_id from the recipe data to associate it with a user
  const userID = recipe.user_id;

    // Create the recipe and associate it with the user
    await Recipe.create({
      ...recipe,
      user_id: userID,
    });
  }

  process.exit(0);
};

seedDatabase();