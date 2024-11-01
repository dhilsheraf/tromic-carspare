const Admin = require('../models/adminModel');

const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body ;
        const admin = await Admin.findOne({ email:email })

        if(admin){
            const passwordMatch = await bcrypt.compare(password,admin.password) ;
            if(passwordMatch){
                res.redirect('/admin/dashboard')
            }else{
                res.render('/adminLogin',{message: "Incorrect password"})
            }
        }else {
            res.render('/adminLogin',{messasge:"You are not admin"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).render('error')
    }
}

const loadAdminLogin = (req,res) =>{
    try {
        res.render('/admin/login')
    } catch (error) {
        console.log(error)
        res.status(500).render('error')
    }
}











module.exports = {
    loadAdminLogin,
    adminLogin
}