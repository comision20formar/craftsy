const express = require("express");
const router = express.Router();

const {
  register,
  processRegister,
  login,
  processLogin,
  profile,
  updateProfile,
  logout,
} = require("../controllers/usersController");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const checkUserLogin = require("../middlewares/checkUserLogin");
const checkNotUserLogin = require("../middlewares/checkNotUserLogin");

/* /users */
router
    .get("/register",checkNotUserLogin, register)
    .post("/register",registerValidator, processRegister)
    .get("/login", checkNotUserLogin, login)
    .post("/login",loginValidator, processLogin)
    .get("/profile",checkUserLogin, profile)
    .put("/update-profile",updateProfile)
    .get("/logout",logout)

module.exports = router;
