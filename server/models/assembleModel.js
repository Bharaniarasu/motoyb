const mongoose = require("mongoose");

const BikeAssembleSchema = new mongoose.Schema({
  userId: String,
  bikeId: String,
  model: String,
  brand: String,
  assemblyTime: String,
  status: String,
  date: Date,
  estimateTime: Date,
});
const BikeAssemble = mongoose.model("BikeAssemble", BikeAssembleSchema);
module.exports = BikeAssemble;
