const adminController = require("../controllers/adminController");
const Admin = require("../models/adminModel")
const express = require('express');
const router = express();

router.get("/login",adminController.loadAdminLogin)
router.post("/login",adminController.adminLogin)
router.get("/dashboard",adminController.loadAdminDashboard)

// users 
router.get("/users",adminController.loadUsers)
router.post('/users/:action/:id',adminController.blockunblock)



module.exports = router