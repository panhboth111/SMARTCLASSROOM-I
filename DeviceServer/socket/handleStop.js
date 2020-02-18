module.exports = (io, device, Device) => {
  device.on("stop", async usedBy => {
    console.log("stoping...");
    const devices = await Device.find({ usedBy });
    console.log(devices);
    await Device.updateMany({ usedBy }, { usedBy: null });
    devices.forEach(device => io.to(device.socketId).emit("stop_device", ""));
  });
};
