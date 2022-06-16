'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipesSubrecipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        recipesSubrecipes.belongsTo(models.Recipes, { 
            foreignKey: 'recipeId', 
            as: 'Recipe' 
        });
        recipesSubrecipes.belongsTo(models.SubRecipes, { 
            foreignKey: 'subRecipeId', 
            as: 'SubRecipe' 
        });
    }
  }
  recipesSubrecipes.init({
    recipeId: DataTypes.INTEGER,
    subRecipeId: DataTypes.INTEGER,
    stepOrder: DataTypes.TINYINT(2)
  }, {
    sequelize,
    modelName: 'recipes-subrecipes',
  });
  return recipesSubrecipes;
};