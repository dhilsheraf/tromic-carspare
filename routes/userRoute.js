const express = require('express');
// const User = require('../models/userModel') ;
const userController = require('../controllers/userController')
const otpController = require('../controllers/otpController')

const router = express();


router.set("view engine", "ejs");
router.set("views", "./views/user");

//otp routes




//home about etc
router.get("/",userController.loadHome) ;

router.get("/about",userController.loadAbout)

router.get("/blog",userController.loadBlog);

router.get("/contact",userController.loadContact)

// sign up
router.get("/signup",userController.loadSignup)
router.post("/signup",userController.signUpUser)

module.exports = router ; 
   