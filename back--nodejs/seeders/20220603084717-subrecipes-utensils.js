'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('subrecipes-utensils', [{
            subRecipeId: 1,
            utensilId: 7,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            subRecipeId: 2,
            utensilId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            subRecipeId: 3,
            utensilId: 8,
            createdAt: new Date(),
            updatedAt: new Date()
          },], {});
      },
    
    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('subrecipes-utensils', null, {});
    }
};