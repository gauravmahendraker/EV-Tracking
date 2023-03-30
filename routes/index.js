const express=  require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    // console.log(lat);
    res.render('index')
    
   // res.send("hello");
})

module.exports= router