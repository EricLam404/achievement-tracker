const router = require("express").Router();

const Student = require("../models/student");

router.get("/students/:student_id", async (req, res) => {
    try {
        const { student_id } = req.params;
        console.log(student_id)
        let student = await Student.findOne({ _id: student_id });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).send({
            message: `Error Getting Student`,
            error: err,
        });
    }
});

module.exports = router;
