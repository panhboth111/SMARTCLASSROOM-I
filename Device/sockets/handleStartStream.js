module.exports = (socket, pythonRunner, Device) => {
  socket.on("start_streaming", async info => {
    const { email, password, streamTitle, description, userEmail } = info;
    await pythonRunner("startStreaming.py", [
      email,
      password,
      streamTitle,
      description,
      userEmail
    ]);
    await Device.updateOne({}, { streaming: streamTitle }).then(() =>
      console.log("updated")
    );
    socket.emit("change_in_device", await Device.findOne());
  });
};
