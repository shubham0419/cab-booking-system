
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const blacklistToken = require("../models/blacklistToken.model.");
const Captain = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      let err = new Error("Please provide token");
      err.code = 401;
      throw err;
    }
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
      let err = new Error("Unauthorized user");
      err.code = 401;
      throw err;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    return next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
} 

module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      let err = new Error("Please provide token");
      err.code = 401;
      throw err;
    }
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
      let err = new Error("Unauthorized user");
      err.code = 401;
      throw err;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Captain.findById(decoded._id);
    return next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
} 