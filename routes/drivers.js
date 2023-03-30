const express = require('express')
const router = express.Router()
const Driver = require('../models/driver')
//  All Drivers Route
router.get('/', (req,res)=>{
    res.render('drivers/index')
})

//New Driver Route

router.get('/new',(req,res)=>
{
    res.render('drivers/new',{driver: new Driver()})
} )
// create driver
router.post('/',(req,res)=>{
    res.send('Create')
} )

module.exports = router