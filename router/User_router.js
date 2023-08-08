const express = require("express");
const Router = express.Router();
const {
  registerUser,
  authUser,
  handel_mypost,
} = require("../controller/user_Controller");

Router.post("/login", authUser);
Router.post("/signup", registerUser);
Router.post("/mypost", handel_mypost);

module.exports = Router;
