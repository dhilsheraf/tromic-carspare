const mongoose = require('mongoose') ; 


const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/carspare");
        console.log(`mongoDB connected : ${conn.connection.host}`);
        
    } catch (error){
        console.error(error.message);
        process.exit(1)

    }
}

module.exports = connectDB