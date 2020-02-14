const mongoose = require('mongoose')
const DB_CONNECTION = 'mongodb://localhost:27017/SeverTest1' || process.env.DB_CONNECTION 

module.exports =  async () => {
    const connection = await mongoose.connect(DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true})
    return connection.connection.db
}