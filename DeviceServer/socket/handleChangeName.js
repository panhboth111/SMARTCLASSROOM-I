module.exports = (io,device,Device) => {
    device.on('changeName',async ({deviceName,deviceId})=>{
        console.log(`${deviceName} ${deviceId}`)
        const _d = await Device.updateOne({deviceId},{deviceName})
        io.to(_d.socketId).emit('change_name',deviceName)
        io.emit('info',await Device.find())
    })
}