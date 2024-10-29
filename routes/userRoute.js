const express = require('express');
// const User = require('../models/userModel') ;
const userController = require('../controllers/userController')


const router = express();


router.set("view engine", "ejs");
router.set("views", "./views/user");

router.get("/",userController.loadHome) ;


module.exports = router ; 
 