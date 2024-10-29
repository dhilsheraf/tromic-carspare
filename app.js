const express = require('express') ;
const app = express();
const path = require('path');
const connectDB = require("./config/config")
const userRoute = require("./routes/userRoute")


const  PORT = process.env.PORT || 8080; 


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));


connectDB()


app.use('/',userRoute)


app.listen(PORT,()=>
console.log(`Server is running on http://localhost:${PORT}`), 
)      