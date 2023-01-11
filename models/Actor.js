const mongoose = require("mongoose");

const actorSchema = mongoose.Schema(
  {
    actorname: {type: String,},
    language: {type: String},
    age: {type: String,},
    yearactive: {type: Number},
    occupation: {type: String,},
    instalink: {type: String,},
    twitlink: {type: String,},
    biography: {type: String,},
    profilePic: {type: String,},
    images: {type: [String]},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Actor", actorSchema);
