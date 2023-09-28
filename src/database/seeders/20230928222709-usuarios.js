"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          surname: "Craftsy",
          email: "admin@gmail.com",
          password:
            "$2a$10$6dmNwOGaBNiU7FKTyEqLx.5lRzw.7L5xrzPxQyAOtMWAe/jpFpJqa",
          image: null,
          roleId: 1,
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name: "User",
          surname: "Craftsy",
          email: "user@gmail.com",
          password:
            "$2a$10$6dmNwOGaBNiU7FKTyEqLx.5lRzw.7L5xrzPxQyAOtMWAe/jpFpJqa",
          image: null,
          roleId: 2,
          createdAt : new Date,
          updatedAt : new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
