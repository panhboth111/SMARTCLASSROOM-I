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
  email: {
    type: String
  },
  date : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model("History", schema);
