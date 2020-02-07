const URL = process.env.URL || 'http://localhost:3001'
const socket = require('socket.io-client')(URL)




module.exports = socket