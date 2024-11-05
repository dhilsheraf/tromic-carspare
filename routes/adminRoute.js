const adminController = require("../controllers/adminController");
const Admin = require("../models/adminModel")
const express = require('express');
const router = express();

router.get("/",adminController.loadAdminLogin)
router.post("/",adminController.adminLogin)
router.get("/dashboard",adminController.loadAdminDashboard)

// users 
router.get("/users",adminController.loadUsers)
router.post('/users/:action/:id',adminController.blockunblock)

//category
router.get("/category",adminController.loadCategory)


module.exports = router