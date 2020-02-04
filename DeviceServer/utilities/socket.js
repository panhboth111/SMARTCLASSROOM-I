const {io} = require('../loaders/io')

module.exports = () => {
    io.on('connection',(device) => {
        console.log(`device ${device.id} connected`)
    })
}