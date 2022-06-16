'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Ingredients', [{
        name: 'flour',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'caster sugar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ricotta',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
