//utils/mailSender

const nodemailer = require('nodemailer');

const mailSender = async (email,title,body) => {
    try{
        // Create a transport to send emails
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        // Send emails to users 
        let info = await transporter.sendMail({
            from:'www.carpare.shop',
            to: email,
            subject: title,
            html:body,
        })
        console.log('Email info :', info);
        return info;
    }catch(error){
        console.log(error)
    }
};

module.exports = mailSender ;