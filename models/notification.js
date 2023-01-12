const mongoose = require("mongoose");

const notifSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  }, 
  created_at: {
    type: Date,
    default: () => { return new Date().getTime()+19800000},
  },
},
{timestamp:true});

const notifModel = mongoose.model("notifications", notifSchema);
module.exports= notifModel;