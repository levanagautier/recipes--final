const models = require("../models");
const {
  getAllRecipes,
  getRecipe,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./recipe.controller");
const {
  getAllSubRecipes,
  getSubRecipe,
  insertSubRecipe,
  updateSubRecipe,
  deleteSubRecipe,
} = require("./subrecipe.controller");
const {
  getAllIngredients,
  getIngredient,
  insertIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientsByName,
} = require("./ingredient.controller");
const {
  getAllUtensils,
  getUtensil,
  insertUtensil,
  updateUtensil,
  deleteUtensil,
  getUtensilsByName,
} = require("./utensil.controller");
const {
  getAllTags,
  getTag,
  insertTag,
  updateTag,
  deleteTag,
} = require("./tag.controller");
const {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
} = require("./user.controller");
const { login, logout } = require("./auth.controller");

const homepage = async (req, res) => {
  console.log(models.Recipes);
  try {
    const lastRecipesList = await models.Recipes.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 4,
    });
    return res.status(200).json({
      template: "homepage",
      recipes: lastRecipesList,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  homepage,
  // recipes
  getAllRecipes,
  getRecipe,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
  // subrecipes
  getAllSubRecipes,
  getSubRecipe,
  insertSubRecipe,
  updateSubRecipe,
  deleteSubRecipe,
  // ingredients
  getAllIngredients,
  getIngredient,
  insertIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientsByName,
  // utensils
  getAllUtensils,
  getUtensil,
  insertUtensil,
  updateUtensil,
  deleteUtensil,
  getUtensilsByName,
  // tags
  getAllTags,
  getTag,
  insertTag,
  updateTag,
  deleteTag,
  // users
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  // auth
  login,
  logout,
};
