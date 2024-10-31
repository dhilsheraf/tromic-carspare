
const User = require("../models/userModel");
const UserOTPVerification = require("../models/otpmodel")
const bcrypt = require("bcrypt");


//route to home 


const signUpUser = async ( req,res) => {
    try {
        const {email,password,number} = req.body;

        console.log(req.body,
            'qwertyuiop'
        );
        

        const existingUser = await userSchema.findOne({email});

        if(existingUser){
            return res.status(400).json({error:'Email already exist'})
        }
        // create new user 
        const newUser = new userSchema ({email,password,number})
        await newUser.save()

        res.render('home')
        
    } catch (error) {
        console.error('Error registering user',error);
        res.status(500).json({error:'An error occured while registering user'})
    }
}

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

const loadSignup = async (req,res) =>{
    try {
        res.render("signup")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    loadHome,
    loadSignup,
    signUpUser,
    loadAbout,
    loadBlog,
    loadContact
} 