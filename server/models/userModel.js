const mongoose = require("mongoose");
//validator library for validating the email and some other datas
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Username"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid Email ID"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    // minLength: [8, "Enter a valid password must be above 8 characters"],
    maxLength: [15, "Enter a valid password below 15 characters"],
    //it will hide the password when find called
    select: false,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// create json web tokens for log in purpose
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
//verify the entered password
UserSchema.methods.isValidPassword = async function (enteredPassword) {
  const isValid = await bcrypt.compare(enteredPassword, this.password);
  return isValid;
};

let userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
