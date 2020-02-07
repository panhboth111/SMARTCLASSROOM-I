module.exports = (socket,pythonRunner,Device) => {
    socket.on('update_info',async (device_info)=> {
        console.log(device_info)
        if(device_info){
            const {deviceName,deviceId,streaming} = device_info
            await Device.updateOne({},{deviceName,deviceId,streaming})
            console.log("done")
        }
    })
}