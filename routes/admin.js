const express = require('express')
const app = express();
const router = express.Router()
const mongoose = require('mongoose')
const Driver = require('../models/driver')
const Driver_new = require('../models/driver_new')
const multer = require('multer');
const upload = multer();

// middleware
router.get('/drivers', async (req,res)=>{
    try{
        const drivers=await Driver_new.find({})
        res.render('drivers/index',{drivers:drivers,response:true})
        
    }
    catch{

    }
    
})
router.get('/track', async (req,res)=>{
    try{
        const drivers=await Driver.find({})
        res.render('index',{drivers:drivers,response:true})
        
    }
    catch{

    }
    
})

router.post('/',(req,res)=>{
   
   // const reqBody = JSON.parse(JSON.stringify(req.body));
    console.log(req.body);
    var userid="atish"
    var pass="atish"
    var response=(pass==req.body.password && userid==req.body.username)
    console.log(response)
    if(response){

        res.render('index',{response:response});
    } else{
        res.redirect('/');
    }
    //res.send(response)
    
    
} )

module.exports = router