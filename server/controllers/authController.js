const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../middlewares/errorHandler");
const userModel = require("../models/userModel");
const GetUserToken = require("../utils/getUserToken");

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password"));
  }
  //get user mail and password. password not shown on find. so we get that from select(+password)
  const user = await userModel.findOne({ email }).select("+password");
  //validating userdata
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  } else if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  } else {
    GetUserToken(user, 201, "User authenticated", res);
  }
});

exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const registeredUser = await userModel.create({
    name,
    email,
    password,
    role,
  });
  GetUserToken(registeredUser, 201, "User Registered", res);
});

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "User Logged Out",
    });
};

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Authentication expired", 400));
  }
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: "User data fetched",
    user: { name: user.name, email: user.email, role: user.role },
  });
});
