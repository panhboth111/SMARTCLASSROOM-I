const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// Import Routes
const userRoute = require("../routes/users")
const authRoute = require("../routes/auth")

//MiddleWare
app.use(bodyParser.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/auth",authRoute)


module.exports = app