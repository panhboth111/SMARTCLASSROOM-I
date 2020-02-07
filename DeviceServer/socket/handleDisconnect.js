module.exports = (io,device,Device) => {
    device.on('disconnect', async()=> {
        console.log("disconnected")
        await Device.updateOne({socketId:device.id},{online:false})
        io.emit('info',await Device.find())
    })
}