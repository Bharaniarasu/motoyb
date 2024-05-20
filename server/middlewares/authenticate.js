const userModel = require("../models/userModel");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
//authentication for access products for logged users only
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new ErrorHandler("Login first for access this Resourse"), 401);
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decode.id);
  next();
});

//authenticate users for particular operations
exports.autheriseUserRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not autherized to access this Data`
        )
      );
    } else {
      next();
    }
  };
