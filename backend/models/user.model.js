const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  fullName:{
    firstName:{
      type:String,
      required:true,
      minlength:[3,"name must have atleast 3 characters"]
    },
    lastName:{
      type:String,
      minlength:[3,"name must have atleast 3 characters"]
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minLength:[5,"email mast have atleast 5 characters"],
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please provide a valid email"]
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  rideInfo:{
    isRideActive:{
      type:Boolean,
      default:false
    },
    rideId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Ride"
    }
  },
  socketId:{
    type:String
  }
})

userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"7d"});
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  console.log("-----",password,this.password);
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async (password)=>{
  return await bcrypt.hash(password,10);
}

const User = mongoose.model("User",userSchema);
module.exports = User;