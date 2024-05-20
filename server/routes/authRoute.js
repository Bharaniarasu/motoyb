const express = require("express");
const {
  login,
  createUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");
const router = express.Router();

router.route("/login").post(login);
router
  .route("/register")
  .post(isAuthenticatedUser, autheriseUserRole("admin"), createUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/").get(isAuthenticatedUser, getUserProfile);

module.exports = router;
