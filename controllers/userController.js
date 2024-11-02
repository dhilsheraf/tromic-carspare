const User = require("../models/userModel");
const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt");
const env = require('dotenv');
const { json } = require("express");
 
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
      return  res.render("signup",{message:""})
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
    return Math.floor(100000 + Math.random() * 900000).toString()
}

//email send function
async function sendVerificationEmail(email,otp){
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            requireTLS: true,
            auth:{
                user: process.env.NODEMAILER_EMAIL ,
                pass: process.env.NODEMAILER_PASSWORD 
            }
        })

        const info = await transporter.sendMail({
            from: "dhilsherafwork@gmail.com",
            to: email,
            subject: "otp test",
            text: `Your OTP is ${otp}`,
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
        const {email,password,cpassword,number,username} = req.body;
        
        if(password !== cpassword) return res.render('signup',{message:"Passwords doesn't match"})

        const findUser = await User.findOne({email});

        if(findUser){
            return res.render('signup',{message:"User already exist"})
        }
        const otp = generateOTP()
        const emailSent = await sendVerificationEmail(email,otp)
        
        console.log("Email sent Status",emailSent)

        if(!emailSent){
            return res.json("email-error")
        }
       
         req.session.userOtp = otp ;
         req.session.userData = {email,password,number,username};

         res.render('verify-otp');
         console.log("OTP Send",otp) 

    } catch (error) {
        console.error("signup error",error);
        res.render("error")
    }
    
}

const securePassword = async (password) => {
    try {
        
       const passwordHash = await bcrypt.hash(password,10)

       return passwordHash;

    } catch (error) {
         

    }
}

const verifyOTP = async (req,res)=>{
       try {
        const {otp}  = req.body
        console.log(otp)

        if(otp === req.session.userOtp){
            const user = req.session.userData
            const passwordHash = await securePassword(user.password);

            const saveUserData = new User({
                username:user.username,
                email:user.email,
                number:user.number,
                password:passwordHash
            })
            await saveUserData.save();
            req.session.user = saveUserData._id
            res.json({success:true, redirectUrl:"/"})
        }else{
            res.status(400).json({ success: false, message:"Invalid OTP, Please try again" })
        }
       } catch (error) {
        
        console.error("Error while verifying the otp",error )
        res.status(500).json({success:false,message:"An error occured"})

       } 
}

//n otp resending
const resendOTP = async (req,res)=>{
    try {
        const {email} = req.session.userData ;
        if(!email){
            return res.status(400).json({ success: false, message:"Email not found in session"})
        }

        const otp = generateOTP();

        req.session.userOtp = otp;

        const emailSent = await sendVerificationEmail(email,otp);

        if(emailSent){
            console.log("Resend OTP :",otp);
            res.status(200).json({ success: true,message: "OTP resent susscessfully"})
            
        }
        else{
            res.status(500),json({ success: false,message: "Failed to resend OTP . Please try again"});
        }
    } catch (error) {
        console.error("error occured while resending otp",error);
        res.status(500).json({success:false,message:"Internal Server error please try again later"})
    }
}

const loadLogin = async (req,res)=>{
    try {
        
    } catch (error) {
        
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
    verifyOTP,
    resendOTP,
    loadLogin
} 