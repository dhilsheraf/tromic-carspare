const mongoose = require('mongoose')

const userOTPVerificationSchema = new mongoose.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiredAt: Date
})

const userOTPVerification = mongoose.model("UserOTPVerification",userOTPVerificationSchema)

module.exports = userOTPVerification