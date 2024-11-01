const User = require("../models/userModel");
const OTP = require("../models/otpmodel")
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
 
//route to home 



const loadHome = async (req,res) =>{
    try {
        res.render('home')
    } catch (error) {
        console.error(error);
        res.status(500).render('error')
    }
}

const loadAbout = async (req,res) =>{
    try {
        res.render('about')
    } catch (error) {
        console.error(error);
        res.status(500).render('error')
    }
}

const loadContact = async (req,res) =>{
    try {
        res.render('contact');
    } catch (error) {
        console.error(error);
        res.status(500).render('error')
    }
}
const loadBlog = async (req,res)=>{
    try {
        res.render('blog');
    } catch (error) {
        console.error(error)
        res.status(500).render('error');
    }
}

const loadShop = async (req,res)=>{
    try {
        res.render('shop');
    } catch (error) {
        console.error(error)
        res.status(500).render('error');
    }
}

const loadSignup = async (req,res) =>{
    try {
        res.render("signup")
    } catch (error) {
        console.log(error)
    }
}

const loadMyAccount = async (req,res) =>{
    try {
        res.render("my-account")
    } catch (error) {
        console.log(error)
        res.status(500).render('error');
    }
}

const loadWishlist = async (req,res) =>{
    try {
        res.render("wishlist")
    } catch (error) {
        console.log(error)
        res.status(500).render('error');
    }
}


module.exports = {
    loadHome,
    loadSignup,
    loadAbout,
    loadBlog,
    loadContact,
    loadShop,
    loadMyAccount,
    loadWishlist,
} 