const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    classNumber: {
        type: Number,
        required: true
    },
    classDate: {
        type: Date,
        required: true
    },
    classAchievement: {
        type: String,
        required: true
    },
    classLevel: {
        type: String,
        required: true,
    },
    classLesson: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Class", classSchema).schema;