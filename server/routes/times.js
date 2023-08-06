const router = require("express").Router();
const Student = require('../models/student');

router.post('/', async (req, res) => {
    const { id, day, time } = req.body;
    const update = {};
    update[`days`] = {
        day: day,
        time: time
    };

    try {
        const doc = await Student.findOneAndUpdate({_id: id}, {$push: update});
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Adding Timeslot');
    }
});

router.delete('/', async (req, res) => {
    const { studentId, timeId } = req.body;
    try {
        const doc = await Student.findOneAndUpdate({_id: studentId},
            {$pull: {
                'days': {
                    _id: timeId
                }
            }});
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Deleting Time');
    }
});

module.exports = router;