const express = require("express");
const {
  login,
  createUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(createUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/").get(isAuthenticatedUser, getUserProfile);

module.exports = router;
