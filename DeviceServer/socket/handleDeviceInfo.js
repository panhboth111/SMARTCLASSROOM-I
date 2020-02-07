const deviceUID = require('../utilities/deviceUID')
const axios = require('axios')
module.exports = async (io,device,Device) => {
    device.on('device_info',async (device_info)=>{
        console.log(device_info)
        if(device_info){
            let {deviceName,deviceId,streaming,cameraPlugged} = device_info
            const _Device = await Device.findOne({deviceId})
            if(_Device){
                await Device.updateOne({deviceId},{socketId:device.id,online:true,streaming:null})
                io.emit('info',await Device.find())
            }
            else{
                console.log("new")
                deviceId = await deviceUID()
                await axios.post('http://localhost:3000/auth/signUp',{email:`device-${deviceId}@device.com`,name:deviceName,pwd:'12345678'})
                await new Device({deviceName,deviceId,socketId:device.id,streaming,cameraPlugged,online:true}).save()
                console.log("done")
                device.emit('update_info',await Device.findOne({deviceId}))
            }
            io.emit('info',await Device.find())
        }
    })
}