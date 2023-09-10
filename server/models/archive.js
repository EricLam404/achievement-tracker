const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = require("./student.js").schema;

const archiveSchema = new Schema({
    student: { type: studentSchema },
    archivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Archive", archiveSchema);
