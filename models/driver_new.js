const mongoose = require('mongoose')

const driverSchema_new = new mongoose.Schema({
    driverId:{
        type: String,
        required: true
    },
    driverName:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    timingSlot:{
        type: String,
        required:true
    }
})
 const Driver_new = new mongoose.model('Driver_new',driverSchema_new)

//const Driver = mongoose.model('Driver',driverSchema)
module.exports = Driver_new;