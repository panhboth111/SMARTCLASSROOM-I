module.exports = (io,device,Device) => {
    device.on('stop',async (usedBy)=>{
        console.log("stoping...")
        const devices = await Device.find({usedBy})
        devices.forEach(device => io.to(device.socketId).emit('stop_device',''))
    }) 
}