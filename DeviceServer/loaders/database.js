const mongoose = require('mongoose')
const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017/developing2'

module.exports = {
    mongoose,
    connect: async () => await mongoose.connect(DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology:true},()=> console.log('database connection established')),
    close: async () => await mongoose.disconnect()
}