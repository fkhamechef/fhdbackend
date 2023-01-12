const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("usersfhd", userShema);
module.exports= userModel;