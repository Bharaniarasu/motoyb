const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../middlewares/errorHandler");
const BikeAssemble = require("../models/assembleModel");
const BikeModel = require("../models/bikeModel");
const {
  addTimeFromString,
  scheduleUpdate,
} = require("../services/assembleServices");

exports.registerBikes = catchAsyncError(async (req, res, next) => {
  const { bikes } = req.body;
  const response = await BikeModel.create(bikes);

  if (response) {
    res.status(201).json({ success: true, message: "Bike added", response });
  }
});
exports.getBikes = catchAsyncError(async (req, res, next) => {
  const bikes = await BikeModel.find();

  if (!bikes) {
    return next(new ErrorHandler("No records found", 400));
  }
  res
    .status(201)
    .json({ success: true, message: "Bike record fetched", bikes });
});

exports.getBikesPerId = catchAsyncError(async (req, res, next) => {
  const bike = await BikeModel.find({ id: +req.params.id });
  if (!bike) {
    return next(new ErrorHandler("No records found", 400));
  }
  res.status(201).json({ success: true, message: "Bike record fetched", bike });
});

exports.initiateAssemble = catchAsyncError(async (req, res, next) => {
  const { bikeId, model, brand, assemblyTime, status } = req.body;
  const userId = req.user._id;
  const date = new Date(Date.now());
  const estimateTime = addTimeFromString(assemblyTime);
  const response = await BikeAssemble.create({
    bikeId,
    userId,
    model,
    brand,
    assemblyTime,
    status,
    date,
    estimateTime,
  });
  if (!response) {
    return next(new ErrorHandler("Invalid Date", 400));
  }
  scheduleUpdate(estimateTime, userId, bikeId, status, response._id);
  res
    .status(200)
    .json({ success: true, message: "Assembling started", status });
});

exports.validatePending = catchAsyncError(async (req, res) => {
  const assembleData = await BikeAssemble.find({
    userId: req.user._id,
    status: "Started",
  });

  if (assembleData.length) {
    return res
      .status(200)
      .json({ success: false, message: "Tasks are pending" });
  }
  return res.status(200).json({ success: true, message: "No Pending Tasks " });
});
