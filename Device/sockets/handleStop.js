module.exports = (socket,pythonRunner,Device) => {
    socket.on('stop_device',async(info)=>{
        pythonRunner('stop.py',socket)
        await Device.updateOne({},{streaming:null})
        socket.emit('change_in_device',await Device.findOne())
    })
}