const mongoose = require("mongoose");

const actorSchema = mongoose.Schema(
  {
    actorname: {type: String,trim: true,},
    nickname: {type: String,trim: true,},
    language: {type: String,trim: true,},
    age: {type: String,trim: true,},
    yearactive: {type: Number,trim: true,},
    occupation: {type: String,trim: true,},
    instalink: {type: String,trim: true,},
    twitlink: {type: String,trim: true,},
    nationality: {type: String,trim: true,},
    hometown: {type: String,trim: true,},
    biography: {type: String,},
    profilePic: {type: String,},
    images: {type: [String]},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Actor", actorSchema);
