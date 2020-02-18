module.exports = (socket, pythonRunner, Device) => {
  socket.on("start_casting", async ({ email, password, streamCode }) => {
    console.log("start casting....");
    await pythonRunner("startCasting.py", [email, password, streamCode]);
    await Device.updateOne({}, { streaming: streamCode });
    socket.emit("change_in_device", await Device.findOne());
  });
};
