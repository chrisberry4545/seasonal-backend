const foodData = require('./food-data');
const recipeData = require('./recipe-data');
const seasonData = require('./season-data');

module.exports = {
  ...foodData,
  ...recipeData,
  ...seasonData
};
