const mongoose = require('mongoose')

const schema = mongoose.Schema({
    deviceName:{
        type:String,
        default: "CLASSROOM-I"
    },
    deviceId:{
        type:String,
        default:""
    },
    streaming:{
        type:String,
        default:null
    },
    cameraPlugged:{
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model('Devices',schema)