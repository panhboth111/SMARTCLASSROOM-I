module.exports = (io,device,Device) => {
    device.on('startStreaming',async (info)=>{
        console.log(info)
        if(info){
            const {deviceId,deviceIds,userEmail,streamTitle,description} = info
            const devices = [deviceId,...deviceIds]
            if(deviceId){
                const _d = await Device.findOne({deviceId})
                await Device.updateMany({deviceId:{$in:devices}},{usedBy:userEmail})
                io.to(_d.socketId).emit('start_streaming',{email:`device-${deviceId}@device.com`,password:'12345678',streamTitle,description,userEmail,deviceIds})
            }
        }

    })
}