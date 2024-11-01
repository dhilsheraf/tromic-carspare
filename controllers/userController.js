const User = require("../models/userModel");
const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt");
const env = require('dotenv')
 
//route to home 


const loadHome = async (req,res) =>{
    try {
        res.render('home')
    } catch (error) {
        console.error("Home page not loading",error);
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
      return  res.render("signup")
    } catch (error) {
        console.log("Home page not loading",error)
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

// function for creating otp
function generateOTP(){
    return Math.floor(100000 + Math.random()*900000).toString()
}

//email send function
async function sendVerificationEmail(email,otp){
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

        const info = await transporter.sendMail({
            from:process.env.NODEMAILER_EMAIL,
            to:email,
            subject:"Verify your account",
            text:`Your OTP is ${otp}`,
            html: `<b>your OTP :${otp}</b>`
        })

        return info.accepted.length > 0

    } catch (error) {
        console.error("Error sending email",error);
        return false;
    }
}

const signUp = async (req, res) => {
    try {
        const {email,password,cpassword,number} = req.body;
        
        if(password !== cpassword) return res.render('signup',{message:"Passwords doesn't match"})

        const findUser = await User.find({email});

        if(findUser){
            return res.render('signup',{message:"User already exist"})
        }
        const otp = generateOTP()

        const emailSent = await sendVerificationEmail(email,otp)

        if(!emailSent){
            return res.json("email-error")
        }

         req.session.userOtp = otp ;
         req.session.userData = {email,password};

        //  res.render('verify-otp');
         console.log("OTP Send",otp)

    } catch (error) {
        console.error("signup error",error);
        res.redirect("/pageNotFound")
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
    signUp,
} 