const express = require('express');
const apiRouter = express.Router();
const controllers = require('../controllers');

apiRouter.route('/recipes').get(controllers.getAllRecipes);

apiRouter.route('/recipes/:id').get(controllers.getRecipe);

apiRouter.route('/subrecipes').get(controllers.getAllSubRecipes);

apiRouter.route('/subrecipes/:id').get(controllers.getSubRecipe);

apiRouter.route('/ingredients').get(controllers.getAllIngredients);

apiRouter.route('/ingredients/:id').get(controllers.getIngredient);

apiRouter.get(
  '/search/ingredients/:ingredientName',
  controllers.getIngredientsByName
);

apiRouter.get('/search/utensils/:utensilName', controllers.getUtensilsByName);

apiRouter.route('/utensils').get(controllers.getAllUtensils);

apiRouter.route('/utensils/:id').get(controllers.getUtensil);

apiRouter.route('/tags').get(controllers.getAllTags);

apiRouter.route('/tags/:id').get(controllers.getTag);

apiRouter.route('/users').get(controllers.getAllUsers);

apiRouter.route('/users/:id').get(controllers.getUser);

module.exports = apiRouter;
