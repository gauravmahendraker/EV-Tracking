const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Driver = require('../models/driver')
const multer = require('multer');
const upload = multer();
//  All Drivers Route
router.get('/', async (req,res)=>{
    try{
        const drivers=await Driver.find({})
        res.render('drivers/index',{drivers:drivers})
        
    }
    catch{

    }
    
})

//New Driver Route

router.get('/new',(req,res)=>
{
    res.render('drivers/new',{driver: new Driver()})
} )
// create driver
router.post('/',upload.none(),async(req,res)=>{
   
    const driver= {
        id:req.body.id,
        name:req.body.name,
        contact:req.body.contact,
        longitude:req.body.longitude,
        latitude:req.body.latitude
    }
    console.log(driver);
    try{
        // const newDriver = await driver.save()
        const newD= new Driver(driver);
        await newD.save();
        console.log('driver Created Successfully')
    }catch
    {
        // res.render('drivers/new',{
        //     driver: driver,
        //     errorMessage: "Error Creating Driver"
        // })
          res.send('error creating driver')
    }

        
} )

module.exports = router