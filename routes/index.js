const express=  require('express')
const router = express.Router()
const Driver = require('../models/driver')
// router.get('/',(req,res)=>{
//     // console.log(lat);
//     res.render('index')
    
//    // res.send("hello");
// })
router.get('/', async (req,res)=>{
    try{
        const drivers=await Driver.find({})
        res.render('index',{drivers:drivers})
        
    }
    catch{

    }
    
})

module.exports= router