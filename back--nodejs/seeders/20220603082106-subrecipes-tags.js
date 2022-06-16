'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('subrecipes-tags', [{
            subRecipeId: 1,
            tagId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            subRecipeId: 3,
            tagId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            subRecipeId: 2,
            tagId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            subRecipeId: 3,
            tagId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            subRecipeId: 1,
            tagId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          }], {});
      },
    
    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('subrecipes-tags', null, {});
    }
};