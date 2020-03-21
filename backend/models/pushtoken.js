const mongoose = require("mongoose");

const pushTokenSchema = mongoose.Schema({
  token:{type:Object, required:true},
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("pushToken", pushTokenSchema);
