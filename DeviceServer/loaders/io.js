const database = require('./database')
const app = require('./app')
const PORT = 3001 || process.env.PORT
const server = app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`)
    database.connect()
})
const io = require('socket.io')(server)

module.exports = {io,server}