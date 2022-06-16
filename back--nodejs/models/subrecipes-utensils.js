'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subrecipesUtensils extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        subrecipesUtensils.belongsTo(models.SubRecipes, { 
            foreignKey: 'subRecipeId', 
            as: 'SubRecipe' 
        });
        subrecipesUtensils.belongsTo(models.Utensils, { 
            foreignKey: 'utensilId', 
            as: 'Utensil' 
        });
    }
  }
  subrecipesUtensils.init({
    subRecipeId: DataTypes.INTEGER,
    utensilId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subrecipes-utensils',
  });
  return subrecipesUtensils;
};