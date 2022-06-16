'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Recipes', [{
        title: 'Earl Grey Pound Cake',
        date: new Date(),
        picture: 'earl-grey-pound-cake.jpg',
        published: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mandarines-Vanilla Pound Cake',
        date: new Date(),
        picture: 'mandarines-vanilla-pound-cake.jpg',
        published: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'White Pesto Pasta',
        date: new Date(),
        picture: 'white-pesto-pasta.jpg',
        published: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Recipes', null, {});
  }
};
