const express = require("express");
const router = express.Router();
const  {body} = require("express-validator");
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.post("/register",[
  body('email').isEmail().withMessage("Invalid email"),
  body('fullName.firstName').isLength({min:3}).withMessage("firstname must have alteast 3 character"),
  body("password").isLength({min:6}).withMessage("password must have alteast 6 character")
],registerUser)

router.post("/login",[
  body('email').isEmail().withMessage("Invalid email"),
  body("password").isLength({min:6}).withMessage("password must have alteast 6 character")
],loginUser)

router.get("/logout",authUser,logoutUser);

router.get("/profile",authUser,getUserProfile);


module.exports = router