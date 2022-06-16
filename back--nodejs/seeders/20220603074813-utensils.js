'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Utensils', [{
            name: 'whisk',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'measuring cups',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'measuring spoons',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'loaf pan',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'parchment paper',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'medium bowl',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'large bowl',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'spatula',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'offset spatula',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Utensils', null, {});
    }
};
