'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        SubRecipe.belongsToMany(models.Ingredients, {
            foreignKey: 'subRecipeId',
            through: 'subrecipes-ingredients',
            as: 'Ingredient'
        }),
        SubRecipe.belongsToMany(models.Recipes, {
            foreignKey: 'subRecipeId',
            sourceKey : 'id',
            through: 'recipes-subrecipes',
            as: 'Recipe'
        }),
        SubRecipe.belongsToMany(models.Tags, {
            foreignKey: 'subRecipeId',
            through: 'subrecipes-tags',
            as: 'Tag'
        }),
        SubRecipe.belongsToMany(models.Utensils, {
            foreignKey: 'subRecipeId',
            through: 'subrecipes-utensils',
            as: 'Utensil'
        })
    }
  }
  SubRecipe.init({
    title: DataTypes.STRING,
    instructions: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'SubRecipes',
  });
  return SubRecipe;
};