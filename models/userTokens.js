const mongoose = require("mongoose");

const userTokenSchema = mongoose.Schema({
    deviceType: {
    type: String,
  },
  deviceId: {
    type: String,
  },
  deviceName: {
    type: String,
  },
  regId: {
    type: String,
  }
});

const userTokenModel = mongoose.model("usertokens", userTokenSchema);
module.exports= userTokenModel;
