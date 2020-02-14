const URL = process.env.URL || 'http://10.10.17.15:3001'
const socket = require('socket.io-client')(URL)




module.exports = socket