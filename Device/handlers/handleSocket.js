const database = require('../loaders/database')
const socket = require('../loaders/socket')

module.exports = () => {
    database.connect()
    socket.on('connect',()=>{
        console.log("connected to server")
    })

} 