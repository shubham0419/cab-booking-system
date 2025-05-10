const Captain = require("../models/captain.model");
const { validationResult } = require("express-validator");
const wrapperMessage = require("../helper/wrapperMessage");


module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = new Error("Please provide all the fields");
      err.code = 400;
      err.message = errors.array();
      throw err;
    }

    const { fullName, email, password ,vehicle} = req.body;
    if (!fullName || !email || !password || !vehicle.vehicleType || !vehicle.plate || !vehicle.color || !vehicle.capacity) {
      let err = new Error("Please provide all the fields");
      err.code = 400;
      throw err;
    }

    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      let err = new Error("Captain already exists");
      err.code = 400;
      throw err;
    }
    const existingVehicle = await Captain.findOne({ "vehicle.plate": vehicle.plate });
    if (existingVehicle) {
      let err = new Error("Vehicle already exists");
      err.code = 400;
      throw err;
    }
    vehicle.vehicleType = vehicle.vehicleType.toLowerCase();

    const hashPass = await Captain.hashPassword(password);

    const captain = new Captain({
      fullName,
      email,
      password: hashPass,
      vehicle: {
        vehicleType: vehicle.vehicleType,
        plate: vehicle.plate,
        color: vehicle.color,
        capacity: vehicle.capacity,
      },
    });

    await captain.save();
    const token = captain.generateAuthToken();
    res.json(wrapperMessage("success", "captain registered successfully", { token, captain }));
  } catch (error) {
    res.json(wrapperMessage("failed", error.message));
  }
}

module.exports.loginCaptain = async (req, res) => {
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
    const user = await Captain.findOne({email}).select('+password');
    if(!user){
      let err = new Error("Invalid email or password !!" ,user);
      err.code = 400;
      throw err;
    }
    console.log(user);
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      let err = new Error("Invalid email or password");
      err.code = 400;
      throw err;
    }
    const token = user.generateAuthToken();
    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000
    })
    res.json(wrapperMessage("success","user logged in successfully",{token,user}))
  } catch (error) {
    res.json(wrapperMessage("failed",error.message))
  }
}

module.exports.logoutCaptain = async (req,res)=>{
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
    await blacklistToken.create({token});
    res.json(wrapperMessage("success","user logged out successfully",{}))
  } catch (error) {
    res.json(wrapperMessage("failed",error.message))
  }
}

module.exports.getCaptainProfile = async (req,res)=>{
  try {
    res.json(wrapperMessage("success","user profile fetched successfully",req.user))
  } catch (error) {
    res.json(wrapperMessage("failed",error.message))
  }
}