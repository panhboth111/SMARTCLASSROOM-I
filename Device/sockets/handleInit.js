const usb = require('usb-detection')
const Device = require('../models/device')
const database = require('../loaders/database')
module.exports = async(socket,pythonRunner) => {
    socket.on('connect',async ()=>{
        database.connect()
        const _Device = await Device.findOne()
        usb.find(async(err,devices)=>{
            const cameraPlugged = devices.find(d => d.deviceName === 'USB Optical Mouse' || d.deviceName === 'USB_Optical_Mouse')? true:false
            if(_Device) await Device.updateOne({},{streaming:null,cameraPlugged})
            else await new Device({streaming:null,cameraPlugged}).save()
            socket.emit('device_info',await Device.findOne())
        })
    })
}