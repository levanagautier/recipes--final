'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Ingredient.belongsToMany(models.SubRecipes, {
            foreignKey: 'ingredientId',
            through: 'subrecipes-ingredients',
            as: 'SubRecipe'
        })
    }
  }
  Ingredient.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredients',
  });
  return Ingredient;
};