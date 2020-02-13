const mongoose = require('mongoose')
const DB_CONNECTION = 'mongodb://localhost:27017/SeverTest1' || process.env.DB_CONNECTION 

module.exports = {
    mongoose,
    connect: async () => await mongoose.connect(DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology:true},()=> console.log('database connection established')),
}