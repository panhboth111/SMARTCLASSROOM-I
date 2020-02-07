const Device = require('../models/device')
const uid = require('uid')

module.exports = async () => {
    let deviceId
    let unique
    do{   
        deviceId = uid(4)
        d = await Device.findOne({deviceId})
        unique = (!d)?true:false
    }while(!unique)
    return deviceId
}