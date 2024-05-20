const express = require("express");
const {
  registerBikes,
  initiateAssemble,
  scheduleUpdate,
  validatePending,
  getBikes,
  getBikesPerId,
} = require("../controllers/bikeController");
const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");

const router = express.Router();

router
  .route("/register")
  .post(isAuthenticatedUser, autheriseUserRole("user"), registerBikes);
router.route("/").get(isAuthenticatedUser, autheriseUserRole("user"), getBikes);
router
  .route("/:id")
  .get(isAuthenticatedUser, autheriseUserRole("user"), getBikesPerId);

router
  .route("/status/update")
  .post(isAuthenticatedUser, autheriseUserRole("user"), initiateAssemble);
router
  .route("/status/validate")
  .get(isAuthenticatedUser, autheriseUserRole("user"), validatePending);

module.exports = router;
