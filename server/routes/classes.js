const router = require("express").Router({ mergeParams: true });
const Student = require("../models/student");

const class_types = ["electronics", "robotics", "coding"];

router.post("/:class_type", async (req, res) => {
    try {
        const { student_id, class_type } = req.params;
        const {
            classNumber,
            classDate,
            classAchievement,
            classLesson,
            classLevel,
        } = req.body;

        if (!class_types.includes(class_type)) {
            return res.status(400).send("Invalid class type!");
        }
        const update = {
            [`classes.${class_type}`]: {
                classNumber,
                classDate,
                classAchievement,
                classLesson,
                classLevel,
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
            message: `Error Adding Class`,
            error: err,
        });
    }
});

router.delete("/:class_type/:class_id", async (req, res) => {
    try {
        const { student_id, class_type, class_id } = req.params;

        if (!class_types.includes(class_type)) {
            return res.status(400).send("Invalid class type!");
        }

        const update = {
            [`classes.${class_type}`]: {
                _id: class_id,
            },
        };
        const doc = await Student.findOneAndUpdate(
            { _id: student_id },
            { $pull: update },
            { new: true }
        );
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error Deleting Class");
    }
});

module.exports = router;
