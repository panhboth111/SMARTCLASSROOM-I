const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => res.send("hello").status(200))



module.exports = app