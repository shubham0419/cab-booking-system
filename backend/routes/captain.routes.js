
const express = require("express");
const router = express.Router();
const  {body} = require("express-validator");
const { authCaptain } = require("../middlewares/auth.middleware");
const { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile } = require("../controllers/captain.controller");


router.post("/register",[
  body('email').isEmail().withMessage("Invalid email"),
  body('fullName.firstName').isLength({min:3}).withMessage("firstname must have alteast 3 character"),
  body("password").isLength({min:6}).withMessage("password must have alteast 6 character"),
  body('vehicle.vehicleType').isIn(["car","moto","auto"]).withMessage("Invalid vehicle type"),
  body('vehicle.plate').isLength({min:3}).withMessage("plate must have alteast 3 character"),
  body('vehicle.color').isLength({min:3}).withMessage("color must have alteast 3 character"),
  body('vehicle.capacity').isInt({gt:0}).withMessage("capacity must be greater than 0"),
],registerCaptain)

router.post("/login",[
  body('email').isEmail().withMessage("Invalid email !!"),
  body("password").isLength({min:6}).withMessage("password must have alteast 6 character")
],loginCaptain)

router.get("/logout",authCaptain,logoutCaptain);

router.get("/profile",authCaptain,getCaptainProfile);

module.exports = router