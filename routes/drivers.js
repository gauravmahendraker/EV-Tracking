const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Driver = require('../models/driver')
const Driver_new = require('../models/driver_new')
const multer = require('multer');
const upload = multer();
// create driver

//  All Drivers Route
router.get('/', async (req,res)=>{
    try{
        const drivers=await Driver_new.find({})
        res.render('drivers/index',{drivers:drivers})
        
    }
    catch{

    }
    
})

// login driver
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
// new driver
router.post('/new',upload.none(),async(req,res)=>{
   
    const driver= {
        driverId:req.body.driverId,
        driverName:req.body.driverName,
        phoneNo:req.body.phoneNo,
        password:req.body.password,
        timingSlot:req.body.timingSlot
    }
    console.log(driver);
    try{
        // const newDriver = await driver.save()
        const newD= new Driver_new(driver);
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
    res.redirect('/admin/track');
} )

module.exports = router