'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subrecipesTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        subrecipesTags.belongsTo(models.SubRecipes, { 
            foreignKey: 'subRecipeId', 
            as: 'SubRecipe' 
        });
        subrecipesTags.belongsTo(models.Tags, { 
            foreignKey: 'tagId', 
            as: 'Tag' 
        });
    }
  }
  subrecipesTags.init({
    subRecipeId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subrecipes-tags',
  });
  return subrecipesTags;
};