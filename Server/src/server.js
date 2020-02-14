// const database = require('./loaders/database')
// const app = require('./loaders/app')
// const PORT = process.env.PORT || 3000
// app.listen(PORT,()=> {
//     console.log(`Server running on port ${PORT}...`)
//     database.connect()
// })
const loaders = require('./loaders')
const app = require('express')()
const startServer = require('./utilities/startServer')
const PORT = process.env.PORT || 3000
startServer(app,PORT,loaders)

