const database = require('../loaders/database')
const socket = require('../loaders/socket')
const handleUsb = require('./handleUsb')
const Device = require('../models/device')
module.exports = async () => {
    database.connect()
    handleUsb('add')
    handleUsb('remove')
    socket.on('update_info',async (device_info)=> {
        console.log(device_info)
        if(device_info){
            const {deviceName,deviceId,streaming} = device_info
            await Device.updateOne({},{deviceName,deviceId,streaming})
            console.log("done")
        }
    })
    socket.on('start_streaming',(info)=>{

    })
    socket.on('start_casting',(info)=>{

    })
    socket.on('stop_device',(info)=>{

    })
    socket.on('reboot_device',(info)=>{

    })
    //socket.on('info',(info) => console.log("heyy"))
} 