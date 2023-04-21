const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required:true
    },
    latitude:{
        type: String,
        required:true
    }

})
 const Driver = new mongoose.model('Driver',driverSchema)

//const Driver = mongoose.model('Driver',driverSchema)
module.exports = Driver;