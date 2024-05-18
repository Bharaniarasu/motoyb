const express = require("express");

const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");
const { getTasks, userProduction } = require("../controllers/adminController");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticatedUser, autheriseUserRole("admin"), getTasks);

router
  .route("/production")
  .get(isAuthenticatedUser, autheriseUserRole("admin"), userProduction);
module.exports = router;
