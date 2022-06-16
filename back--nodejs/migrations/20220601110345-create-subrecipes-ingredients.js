'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subrecipes-ingredients', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER.UNSIGNED
        },
        subRecipeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
            model: 'SubRecipes',
            key: 'id',
        },
        onDelete: 'CASCADE'
      },
      ingredientId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
            model: 'Ingredients',
            key: 'id',
        },
        onDelete: 'CASCADE',
      },
      qty: {
        type: Sequelize.FLOAT
      },
      unit: {
        allowNull: false,
        type: Sequelize.ENUM('','g','mg','l','cl','ml')
      },
      prepNotes: {
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subrecipes-ingredients');
  }
};