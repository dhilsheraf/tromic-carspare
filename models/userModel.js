const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema(
    {
    firstName : { type : String, required : true },
    lastName : { type : String },
    email : { type : String, required : true },
    password : { type : String , required : true},
    // otp : {type : String },
    // otpExpries : {type : Date },
    // isBlock : { type : Boolean , default:false },
    // isVerfied : { type : Boolean , default:false},
    mobile : { type : Number , required:true}
    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User ;
