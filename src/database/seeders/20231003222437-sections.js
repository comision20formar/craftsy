'use strict';

const sections =  [
  {
    name : 'Nuevo',
    createdAt : new Date,
    updatedAt : new Date,
  },
  {
    name : 'Refaccionado',
    createdAt : new Date,
    updatedAt : new Date,
  },
  {
    name : 'Usado',
    createdAt : new Date,
    updatedAt : new Date,
  }
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Sections', sections, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Sections', null, {});
     
  }
};
