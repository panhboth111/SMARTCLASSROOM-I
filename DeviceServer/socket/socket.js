const uid = require('uid')
const axios = require('axios')
const {io} = require('../loaders/io')
const Device = require('../models/device')
const deviceUID = require('../utilities/deviceUID')
module.exports = () => {
    io.on('connection',(device) => {
        console.log(`device ${device.id} connected`)
        device.on('device_info',async (device_info)=>{
            if(device_info){
                let {deviceName,deviceId,streaming,cameraPlugged} = device_info
                const _Device = await Device.findOne({deviceId})
                if(_Device){
                    await Device.updateOne({deviceId},{socketId:device.id,online:true,streaming:null})
                }
                else{
                    deviceId = await deviceUID()
                    await new Device({deviceName,deviceId,socketId:device.id,streaming,cameraPlugged,online:true}).save()
                    axios.post('http://localhost:3000/auth/signUp',{email:`device-${deviceId}@device.com`,name:'device',pwd:'12345678'})
                    device.emit('update_info',await Device.findOne({deviceId}))
                }
                io.emit('info',await Device.find())
            }
        })
        device.on('change_in_device',async (device_info)=>{
            const {streaming,cameraPlugged,deviceId} = device_info
            await Device.updateOne({deviceId},{streaming,cameraPlugged})
        })
        device.on('startStreaming',(info)=>{

        })
        device.on('startCasting',(info)=>{

        })
        device.on('stop',(info)=>{

        })
        device.on('changeName',(info)=>{

        })
        device.on('rebootDevice',(info)=>{

        })
        device.on('disconnect', async()=> {
            console.log("disconnected")
            await Device.updateOne({socketId:device.id},{online:false})
        })
    })
}