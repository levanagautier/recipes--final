'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Tags', [{
            name: 'Pasta',
            color: 'FFF4D6',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Pastry',
            color: 'C9E1BE',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Desserts',
            color: 'E6E6FA',
            createdAt: new Date(),
            updatedAt: new Date()
          }], {});
      },
    
    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Tags', null, {});
    }
};
