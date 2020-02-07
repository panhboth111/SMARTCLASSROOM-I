const app = require('./app')
const PORT = 3001 || process.env.PORT
const database = require('./database')
const server = app.listen(PORT,()=>{
    database.connect()
    console.log(`listening on port ${PORT}...`)
})
const io = require('socket.io')(server)

module.exports = {io,server}