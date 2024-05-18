const express = require("express");
const {
  registerBikes,
  initiateAssemble,
  scheduleUpdate,
  validatePending,
} = require("../controllers/bikeController");
const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");

const router = express.Router();

router.route("/register").post(registerBikes);
router
  .route("/status/update")
  .post(isAuthenticatedUser, autheriseUserRole("user"), initiateAssemble);
router.route("/status/validate").get(isAuthenticatedUser, validatePending);

module.exports = router;
