const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const captainSchema = new mongoose.Schema({
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
  socketId:{
    type:String
  },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
  },
  vehicle:{
    color:{
      type:String,
      required:true,
      minlength:[3,"color must have atleast 3 characters"]
    },
    plate:{
      type:String,
      required:true,
      minlength:[3,"plate must have atleast 3 characters"]
    },
    capacity:{
      type:Number,
      required:true,
      min:[1,"capacity must be greater than 0"]
    },
    vehicleType:{
      type:String,
      enum:["car","bike","auto"],
      required:true
    }
  },
  location:{
    ltd:{
      type:Number,
    },
    lng:{
      type:Number,
    }
  }
})

captainSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id:this._id,role:"captain"},process.env.JWT_SECRET,{expiresIn:"7d"});
  return token;
}

captainSchema.methods.comparePassword = async function (password) {
  console.log("-----",password,this.password);
  return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async (password)=>{
  return await bcrypt.hash(password,10);
}

const Captain = mongoose.model("Captain",captainSchema);
module.exports = Captain;