'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Tag.belongsToMany(models.Tags, {
            foreignKey: 'tagId',
            through: 'subrecipes-tags',
            as: 'Tag'
        })
    }
  }
  Tag.init({
    name: DataTypes.STRING,
    color: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tag;
};