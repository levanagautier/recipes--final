'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utensil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Utensil.belongsToMany(models.SubRecipes, {
            foreignKey: 'utensilId',
            through: 'subrecipes-utensils',
            as: 'SubRecipe'
        })
    }
  }
  Utensil.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Utensils',
  });
  return Utensil;
};