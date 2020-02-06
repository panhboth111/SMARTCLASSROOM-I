const mongoose = require('mongoose')
const usb = require('usb-detection')
const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017/developing'
const Device = require('../models/device')
module.exports = {
    mongoose,
    connect: async () => await mongoose.connect(DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology:true},async()=> {
        console.log('database connection established')
        const _Device = await Device.findOne()
        usb.find(async(err,devices)=>{
            const cameraPlugged = devices.find(d => d.deviceName === 'USB Optical Mouse' || d.deviceName === 'USB_Optical_Mouse')? true:false
            if(_Device) await Device.updateOne({},{streaming:null,cameraPlugged})
            else await new Device({streaming:null,cameraPlugged}).save()
        })
    }),
}