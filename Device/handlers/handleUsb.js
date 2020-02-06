const usb = require('usb-detection')
const Device = require('../models/device')
const socket = require('../loaders/socket')

module.exports = (event) => {
    usb.startMonitoring()
    usb.on(event,async(device)=> {
        const cameraPlugged = (event === 'add')?true:false
        if(device.deviceName === 'USB Optical Mouse' || device.deviceName === 'USB_Optical_Mouse') { 
            await Device.updateOne({},{cameraPlugged})
            socket.emit('change_in_device',await Device.findOne())
        }
    })
}