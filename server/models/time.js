const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const timeSchema = new Schema({
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    time: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model("Time", timeSchema);
