const mongoose = require("mongoose");

const schema = mongoose.Schema({
  action: {
    type: String
  },
  streamCode: {
    type: String
  },
  streamTitle: {
    type: String
  },
  emai: {
    type: String
  }
});

module.exports = mongoose.model("History", schema);
