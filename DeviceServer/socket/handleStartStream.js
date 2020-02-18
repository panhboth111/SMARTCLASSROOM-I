module.exports = (io, device, Device) => {
  device.on("startStreaming", async info => {
    console.log(info);
    if (info) {
      let { deviceId, userEmail, streamTitle, description } = info;
      description = description ? description : "none";
      if (deviceId) {
        const _d = await Device.findOne({ deviceId });
        console.log(deviceId);
        console.log(userEmail);
        await Device.updateOne({ deviceId }, { usedBy: userEmail });
        io.to(_d.socketId).emit("start_streaming", {
          email: `device-${deviceId}@device.com`,
          password: "12345678",
          streamTitle,
          description,
          userEmail
        });
        console.log("done");
      }
    }
  });
};
