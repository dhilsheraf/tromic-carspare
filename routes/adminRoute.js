const adminController = require("../controllers/adminController");
const Admin = require("../models/adminModel")
const express = require('express');
const router = express();
const categoryController = require("../controllers/categoryController")

router.get("/",adminController.loadAdminLogin)
router.post("/",adminController.adminLogin)
router.get("/dashboard",adminController.loadAdminDashboard)

// users 
router.get("/users",adminController.loadUsers)
router.post('/users/:action/:id',adminController.blockunblock)

//category

router.get("/category",categoryController.loadCategory)
router.get("/category/add",categoryController.addCategoryLoad);
router.post("/category/add",categoryController.addCategory)

router.post('/category/:id/toggle-status',categoryController.activeInactive )

router.get("/category/edit/:id",categoryController.editCategoryLoad)
router.post('/category/edit/:id',categoryController.editCategory);
 
//product 
router.get("/product")

module.exports = router