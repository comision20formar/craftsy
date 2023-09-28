'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique : true,
        allowNull : false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      image: {
        type: Sequelize.STRING
      },
      gender : {
        type : Sequelize.STRING
      },
       birthday : {
        type : Sequelize.DATE
      },
      about : {
        type : Sequelize.TEXT
      },
      roleId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Roles'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};