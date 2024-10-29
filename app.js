const express = require('express') ;
const app = express();
const path = require('path');

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get(("/"),(req,res)=>{
    res.render('user/wishlist');
})
app.listen(2000,()=>
console.log("Server is running"), 
)     