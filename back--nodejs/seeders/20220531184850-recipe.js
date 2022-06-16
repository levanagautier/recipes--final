"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Recipes",
      [
        {
          title: "Earl Grey Pound Cake",
          date: new Date(),
          picture: "earl-grey-pound-cake.jpg",
          published: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Recipes", null, {});
  },
};
