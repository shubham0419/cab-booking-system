const wrapperMessage = require("../helper/wrapperMessage");
const blacklistToken = require("../models/blacklistToken.model.");
const User = require("../models/user.model");
const {validationResult} = require("express-validator")

module.exports.registerUser = async (req,res)=>{
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      let err = new Error("Please provide all the fields");
      err.code = 400;
      err.message = errors.array();
      throw err;
    }

    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password){
      let err = new Error("Please provide all the fields");
      err.code = 400;
      throw err;
    }

    const hashPass = await User.hashPassword(password);

    const user = new User({
      fullName,
      email,
      password:hashPass,
    })

    await user.save();

    const token = user.generateAuthToken();
    res.json(wrapperMessage("success","user registered successfully",{token,user}))
  } catch (error) {
    res.json(wrapperMessage("failed",error.message))
  }
}

module.exports.loginUser = async (req,res)=>{
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      let err = new Error("Please provide all the fields");
      err.code = 400;
      err.message = errors.array();
      throw err;
    }
    const {email,password} = req.body;
    if(!email || !password){
      let err = new Error("Please provide all the fields");
      err.code = 400;
      throw err;
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
      let err = new Error("Invalid email ");
      err.code = 400;
      throw err;
    }
  
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      let err = new Error("Invalid email or password");
      err.code = 400;
      throw err;
    }
    const token = user.generateAuthToken();
    res.json(wrapperMessage("success","user logged in successfully",{token,user}))
  } catch (error) {
    console.log(error);
    res.json(wrapperMessage("failed",error.message))
  }
}

module.exports.logoutUser = async (req,res)=>{
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    await blacklistToken.create({token});
    res.json(wrapperMessage("success","user logged out successfully",{}))
  } catch (error) {
    res.json(wrapperMessage("failed",error.message))
  }
}

module.exports.getUserProfile = async (req,res)=>{
  try {
    res.json(wrapperMessage("success","user profile fetched successfully",req.user))
  } catch (error) {
    res.json(wrapperMessage("failed",error.message))
  }
}