'use strict';

const originJSON =  require('../../data/origins.json');
const origins = originJSON.map(origin => {
  return {
      country : origin,
      flag : null,
      createdAt : new Date,
      updatedAt : new Date
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Origins', origins, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Origins', null, {});
     
  }
};
