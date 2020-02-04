const app = require('express')()


app.get('/',(req,res) => res.send("hello").status(200))



module.exports = app