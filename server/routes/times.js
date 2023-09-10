const router = require("express").Router({ mergeParams: true });
const Student = require("../models/student");

router.post("/", async (req, res) => {
    try {
        const { student_id } = req.params;
        const { day, time } = req.body;
        const update = {
            [`days`]: {
                day: day,
                time: time,
            },
        };
        const doc = await Student.findOneAndUpdate(
            { _id: student_id },
            { $push: update },
            { new: true }
        );
        res.send(doc);
    } catch (err) {
        res.status(500).send({
            message: "Error Adding Timeslot",
            error: err,
        });
    }
});

router.delete("/:time_id", async (req, res) => {
    try {
        const { student_id, time_id } = req.params;
        const doc = await Student.findOneAndUpdate(
            { _id: student_id },
            {
                $pull: {
                    days: {
                        _id: time_id,
                    },
                },
            },
            { new: true }
        );
        res.send(doc);
    } catch (err) {
        res.status(500).send({
            message: "Error Deleting Time",
            error: err,
        });
    }
});

module.exports = router;
