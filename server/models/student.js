const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = require('./class.js').schema;
const timeSchema = require('./time.js').schema;

const studentSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  dob: {type: String},
  age: {type: Number},
  phone: {type: String, required: true},
  address: {type: String},
  started: {type: Date, default: Date.now},
  days: [timeSchema],
  classes: {
    robotics: [classSchema],
    electronics: [classSchema],
    coding: [classSchema],
  }
});

studentSchema.virtual("url").get(function () {
  return `/students/${this._id}`;
});
module.exports = mongoose.model("Student", studentSchema);



