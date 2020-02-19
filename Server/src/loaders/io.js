const app = require("express")();
const server = app.listen(3002);
const io = require("socket.io")(server);

io.on("connection", c => {
  c.on("streamStop", streamCode => {
    console.log("hmmmmm");
    io.emit("stopStream", streamCode);
  });
});
module.exports = io;
