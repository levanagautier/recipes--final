'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Recipe.belongsToMany(models.SubRecipes, {
            foreignKey: 'recipeId',
            sourceKey: 'id',
            through: 'recipes-subrecipes',
            as: 'SubRecipes'
        })
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    picture: DataTypes.STRING,
    published: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recipes',
  });
  return Recipe;
};