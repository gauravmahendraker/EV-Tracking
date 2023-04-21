const express=  require('express')
const router = express.Router()
const Driver = require('../models/driver_new')
// router.get('/',(req,res)=>{
//     // console.log(lat);
//     res.render('index')
    
//    // res.send("hello");
// })
router.get('/', async (req,res)=>{
    // try{
        // const drivers=await Driver.find({})
        // res.render('index',{drivers:drivers})
        
        res.render('index', {driverId:null});
    // }
    // catch{
    //     res.send('error');
    // }
    
})
router.get('/home', async (req,res)=>{
    // try{
        // const drivers=await Driver.find({})
        // res.render('index',{drivers:drivers})
        
        res.render('index2',{nonav:true});
    // }
    // catch{
    //     res.send('error');
    // }
    
})
router.post('/', async (req, res)=>{
    
    let sop={}
        if(req.body.driverId != null && req.body.password != null){
            sop.driverId = req.body.driverId
            sop.password = req.body.password
           // console.log(sop)
            try{
                const users = await Driver.find(sop);
                if(users != null){
                   // console.log(users[0].driverId)
                    res.render('index', {driverId:users[0].driverId, contact:users[0].phoneNo, name:users[0].driverName})
                } else {
                    res.render('index')
                }
            }
            catch{
                res.render('index',{error:true})
            }
        } else {
            res.render('index')
        }

})

module.exports= router