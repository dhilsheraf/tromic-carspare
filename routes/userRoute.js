const express = require('express');
// const User = require('../models/userModel') ;
const userController = require('../controllers/userController')

const router = express();


router.set("view engine", "ejs");
router.set("views", "./views/user");

//otp routes




//home about etc
router.get("/",userController.loadHome) ;

router.get("/about",userController.loadAbout)

router.get("/blog",userController.loadBlog);

router.get("/shop",userController.loadShop);

router.get("/contact",userController.loadContact);

router.get("/my-account",userController.loadMyAccount)

router.get("/wishlist",userController.loadWishlist)

// sign up
router.get("/signup",userController.loadSignup)
router.post("/signup",userController.signUp)



//otp


// router.post('/send-otp', userController.sendOTP);

 
module.exports = router ; 
   