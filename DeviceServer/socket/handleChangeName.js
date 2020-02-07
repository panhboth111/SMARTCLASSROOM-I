module.exports = (io,device,Device) => {
    device.on('changeName',async (deviceName,deviceId)=>{
        const _d = await Device.findOne({deviceId},{deviceName})
        io.to(_d.socketId).emit('change_name',deviceName)
    })
}