const mongoose = require('mongoose') ;

const UserSchema = new mongoose.Schema({
    username:
     { type: String, required: true },
    email:
     { type: String, required: true},
    number:
     { type: String, required: false ,spare: true,default:null},
     googleId:{
      type:String,
      unique:true
     },
    password:
     { type: String, required: false }
});

module.exports = mongoose.model('User', UserSchema); 