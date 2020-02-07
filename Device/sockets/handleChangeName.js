module.exports = (socket,Device) => {
    socket.on('change_name',async (deviceName)=> await Device.updateOne({},{deviceName}))
}