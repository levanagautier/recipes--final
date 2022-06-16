'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      picture: {
        type: Sequelize.STRING(255),
      },
      published: {
        allowNull: false,
        type: Sequelize.TINYINT(1)
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
    await queryInterface.dropTable('Recipes');
  }
};