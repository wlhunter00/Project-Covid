const mongoose = require("mongoose");

const notifcationSchema = mongoose.Schema({
  title: {
    type: String,
    Max: 200
  },
  body: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("notifcation", notifcationSchema);
