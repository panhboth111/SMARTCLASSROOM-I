module.exports = (io,device,Device) => {
    device.on('startCasting',async (info)=>{
        console.log("start to cast")
        const {streamTitle,deviceIds} = info
        const usedBy = info.usedBy || "none"
        console.log(usedBy)
        if(usedBy!=="none") await Device.updateMany({deviceId:{$in:deviceIds}},{usedBy})
        const devices = await Device.find({deviceId:{$in:deviceIds}})
        devices.forEach(d => io.to(d.socketId).emit('start_casting',{email:`device-${d.deviceId}@device.com`,password:"12345678", streamTitle}))
    })
}