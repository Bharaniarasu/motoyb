const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema({
  //   id: Number,
  model: String,
  brand: String,
  color: String,
  assemblyTime: String,
  wheelSize: String,
  suspension: String,
  gears: String,
  brakes: String,
  material: String,
  weight: String,
  price: String,
  owner: {
    name: String,
    contact: String,
    address: String,
  },
  serviceCost: String,
  mileage: String,
  fuelType: String,
  fuelCapacity: String,
  tyreType: String,
  wheelType: String,
  maxSpeed: String,
  url: String,
});

const BikeModel = mongoose.model("Bike", BikeSchema);
module.exports = BikeModel;
