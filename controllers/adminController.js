const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body ;
        const admin = await Admin.findOne({ email:email })

        if(admin){
            const passwordMatch = await bcrypt.compare(password,admin.password) ;
            if(passwordMatch){
                res.redirect('/admin/dashboard');
            }else{
                res.render('admin/adminlogin',{message: "Incorrect password"})
            }
        }
        else {
            res.render('admin/adminlogin',{messasge:"You are not admin"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).render('admin/adminlogin',{message:"try again later serever down"})
    }
}

const loadAdminLogin = (req,res) =>{
    try {
        res.render('admin/adminlogin',{message:""})
    } catch (error) {
        console.log("error while admin login",error)
        res.status(500).render('error')
    }
}

const loadAdminDashboard = async (req,res) =>{
    try {
        res.render('admin/adminDashboard')
    } catch (error) {
        console.log("error while loading admin dashboard");
        res.status(500).render('error')
    }
}

const loadUsers = async (req,res) =>{
    try {
        // Fetch users from the database
        const users = await User.find({});
        
        // Render the EJS view and pass the user data
        res.render('admin/adminUser', { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
}

const blockunblock = async (req, res) => {
    const { action, id } = req.params;

    try {
        const user = await User.findById(id); // Ensure you have the correct user model imported
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (action === 'block') {
            user.isBlocked = true; // Assuming you have an isblocked field
        } else if (action === 'unblock') {
            user.isBlocked = false;
        } else {
            return res.status(400).json({ success: false, message: "Invalid action" });
        }

        await user.save(); // Save the changes
        return res.json({ success: true, message: `User ${action}ed successfully` });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


module.exports = {
    loadAdminLogin,
    adminLogin,
    loadAdminDashboard,
    loadUsers,
    blockunblock
}