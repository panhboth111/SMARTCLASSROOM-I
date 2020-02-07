const mongoose = require('mongoose')
const DB_CONNECTION = process.env.DB_CONNECTION ||  'mongodb://localhost:27017/livechats'

module.exports = async () => {
    const connection = await mongoose.connect(DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},()=> console.log("database connection established"))
    return connection.connection.db
}