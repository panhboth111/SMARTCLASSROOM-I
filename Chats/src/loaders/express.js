const bodyParser = require('body-parser')
const cors = require('cors')
const Room = require('../models/room')
module.exports = async app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.post('/createRoom',async (req,res)=> {
        try {
            const {roomName,roomOwner,roomId} = req.body
            await new Room({roomName,roomOwner,roomId}).save()
            console.log("room created")
            res.send("done")
        } catch (error) {
            console.log(err)
        }
    })
    return app
}