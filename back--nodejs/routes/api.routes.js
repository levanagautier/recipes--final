const express = require("express");
const apiRouter = express.Router();
const controllers = require("../controllers");

apiRouter.route("/recipes").get(controllers.getAllRecipes);
// .post(controllers.insertRecipe);

apiRouter.route("/recipes/:id").get(controllers.getRecipe);
// .put(controllers.updateRecipe)
// .delete(controllers.deleteRecipe);

apiRouter.route("/subrecipes").get(controllers.getAllSubRecipes);
// .post(controllers.insertSubRecipe);

apiRouter.route("/subrecipes/:id").get(controllers.getSubRecipe);
// .put(controllers.updateSubRecipe)
// .delete(controllers.deleteSubRecipe);

apiRouter.route("/ingredients").get(controllers.getAllIngredients);
// .post(controllers.insertIngredient);

apiRouter.route("/ingredients/:id").get(controllers.getIngredient);
// .put(controllers.updateIngredient)
// .delete(controllers.deleteIngredient);

apiRouter.get(
  "/search/ingredients/:ingredientName",
  controllers.getIngredientsByName
);

apiRouter.get("/search/utensils/:utensilName", controllers.getUtensilsByName);

apiRouter.route("/utensils").get(controllers.getAllUtensils);
// .post(controllers.insertUtensil);

apiRouter.route("/utensils/:id").get(controllers.getUtensil);
// .put(controllers.updateUtensil)
// .delete(controllers.deleteUtensil);

apiRouter.route("/tags").get(controllers.getAllTags);
// .post(controllers.insertTag);

apiRouter.route("/tags/:id").get(controllers.getTag);
// .put(controllers.updateTag)
// .delete(controllers.deleteTag);

apiRouter.route("/users").get(controllers.getAllUsers);
// .post(controllers.insertUser);

apiRouter.route("/users/:id").get(controllers.getUser);
// .put(controllers.updateUser)
// .delete(controllers.deleteUser);

module.exports = apiRouter;
