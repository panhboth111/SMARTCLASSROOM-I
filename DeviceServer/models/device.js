const mongoose = require('mongoose')

const schema = mongoose.Schema({
    deviceName:{
        type:String,
        required:true
    },
    deviceId:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
        required:true
    },
    streaming:{
        type:String,
    },
    cameraPlugged:{
        type:Boolean,
        required:true
    },
    online:{
        type:Boolean,
        required:true
    },
})

module.exports = mongoose.model('Device',schema)