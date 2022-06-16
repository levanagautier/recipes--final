const express = require("express");
const guardedApiRouter = express.Router();
const controllers = require("../controllers");
const authMiddleware = require("../middleware/auth.middleware");

guardedApiRouter.use(authMiddleware);

guardedApiRouter.route("/recipes").post(controllers.insertRecipe);

guardedApiRouter
  .route("/recipes/:id")
  .put(controllers.updateRecipe)
  .delete(controllers.deleteRecipe);

guardedApiRouter.route("/subrecipes").post(controllers.insertSubRecipe);

guardedApiRouter
  .route("/subrecipes/:id")
  .put(controllers.updateSubRecipe)
  .delete(controllers.deleteSubRecipe);

guardedApiRouter.route("/ingredients").post(controllers.insertIngredient);

guardedApiRouter
  .route("/ingredients/:id")
  .put(controllers.updateIngredient)
  .delete(controllers.deleteIngredient);

guardedApiRouter.route("/utensils").post(controllers.insertUtensil);

guardedApiRouter
  .route("/utensils/:id")
  .put(controllers.updateUtensil)
  .delete(controllers.deleteUtensil);

guardedApiRouter.route("/tags").post(controllers.insertTag);

guardedApiRouter
  .route("/tags/:id")
  .put(controllers.updateTag)
  .delete(controllers.deleteTag);

guardedApiRouter.route("/users").post(controllers.insertUser);

guardedApiRouter
  .route("/users/:id")
  .put(controllers.updateUser)
  .delete(controllers.deleteUser);

module.exports = guardedApiRouter;
