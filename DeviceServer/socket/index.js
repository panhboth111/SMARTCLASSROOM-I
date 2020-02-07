const app = require('../loaders/app')
const axios = require('axios')
const {io} = require('../loaders/io')
const Device = require('../models/device')

const handleDeviceInfo = require('./handleDeviceInfo')
const handleChangeInDevice = require('./handleChangeInDevice')
const handleStartStream = require('./handleStartStream')
const handleStartCasting = require('./handleStartCasting')
const handleStop = require('./handleStop')
const handleChangeName = require('./handleChangeName')
const handleRebootDevice = require('./handleRebootDevice')
const handleDisconnect = require('./handleDisconnect')

module.exports = async() => {
    io.on('connection',async (device) => {
        io.emit('info',await Device.find())
        console.log(`device ${device.id} connected`)
        handleDeviceInfo(io,device,Device)
        handleChangeInDevice(io,device,Device)
        handleStartStream(io,device,Device)
        handleStartCasting(io,device,Device)
        handleStop(io,device,Device)
        handleChangeName(io,device,Device) 
        handleRebootDevice(io,device,Device)
        handleDisconnect(io,device,Device)

    })
    app.post('/redirect',(req,res)=>{
        console.log('redirecting...')
        console.log(req.body)
        io.emit('redirect',req.body)
    })
}