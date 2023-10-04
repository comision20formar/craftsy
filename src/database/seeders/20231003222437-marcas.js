'use strict';

const marcasJSON =  require('../../data/brands.json');
const brands = marcasJSON.map((brand,index) => {
  return {
      name : brand.name,
      image : null,
      originId : index + 1,
      createdAt : new Date,
      updatedAt : new Date
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Brands', brands, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Brands', null, {});
     
  }
};
