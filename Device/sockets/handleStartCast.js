module.exports = (socket,pythonRunner,Device) => {
    socket.on('start_casting',async ({email,password,streamTitle})=>{
        console.log("start casting....")
        await pythonRunner('startCasting.py',socket,[email,password,streamTitle])
        await Device.updateOne({},{streaming:streamTitle})
        socket.emit('change_in_device',await Device.findOne())
    })
}