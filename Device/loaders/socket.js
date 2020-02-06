const socket = require('socket.io-client')('http://localhost:3001')
const {PythonShell} = require('python-shell')
const Device = require('../models/device')
socket.on('connect',async()=>{
    console.log("connected to server")
    PythonShell.run('python/stop.py',null,(err) => console.log("Streams cleared"))
    await Device.updateOne({},{streaming:null})
    socket.emit('device_info',await Device.findOne())
})

module.exports =  socket