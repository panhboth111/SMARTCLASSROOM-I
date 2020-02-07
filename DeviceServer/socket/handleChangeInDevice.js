module.exports = (io,device,Device) => {
    device.on('change_in_device',async (device_info)=>{
        console.log("changing....")
        const {streaming,cameraPlugged,deviceId} = device_info
        await Device.updateOne({deviceId},{streaming,cameraPlugged})
        io.emit('info',await Device.find())
    })
}