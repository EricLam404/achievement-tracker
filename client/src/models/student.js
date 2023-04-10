const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = require('./class');
const timeSchema = require('./time');

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {type: String,},
  age: {type: Number},
  phone: {
    type: String,
    required: true
  },
  address: {type: String},
  started: {type: Date, default: Date.now},
  days: [
    {
      time: {
        type: timeSchema,
        required: true
      }
    }
  ],
  robotics: [
    {
      class: {
        type: classSchema,
      }
    }
  ],
  electronics: [
    {
      class: {
        type: classSchema,
      }
    }
  ],
  coding: [
    {
      class: {
        type: classSchema,
      }
    }
  ]
});

studentSchema.virtual("url").get(function () {
  return `/students/${this._id}`;
});
module.exports = mongoose.model("Student", studentSchema);



