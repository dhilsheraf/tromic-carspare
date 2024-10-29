// const bcrypt = require("bcrypt") ;
// const User = require("../models/userModel");



//route to home 

const loadHome = (req,res) =>{
   res.render("home")
}



module.exports = {
    loadHome,

} 