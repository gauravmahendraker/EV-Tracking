const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    id:{
        type: Number,
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

module.exports = mongoose.model('Driver',driverSchema)