'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subrecipesIngredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        subrecipesIngredients.belongsTo(models.SubRecipes, { 
            foreignKey: 'subRecipeId', 
            as: 'SubRecipe' 
        });
        subrecipesIngredients.belongsTo(models.Ingredients, { 
            foreignKey: 'ingredientId', 
            as: 'Ingredient' 
        });
    }
  }
  subrecipesIngredients.init({
    subRecipeId: DataTypes.INTEGER.UNSIGNED,
    ingredientId: DataTypes.INTEGER.UNSIGNED,
    qty: DataTypes.FLOAT,
    unit: DataTypes.ENUM('', 'g', 'mg', 'l', 'cl', 'ml'),
    prepNotes: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'subrecipes-ingredients',
  });
  return subrecipesIngredients;
};