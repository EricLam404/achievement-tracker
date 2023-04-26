const router = require("express").Router();

const Student = require('../models/student');
const Archive = require('../models/archive');

router.get('/', function(req, res, next) {
    res.render('home', { title: 'archive' });
});

router.delete('/student', async (req, res) => {
    const { studentId } = req.body;
    const deletedStudent = await Student.findOne({_id: studentId});
    const student = deletedStudent.toJSON();
    const archiveStudent = new Archive({ student: student });

    try {
        const doc = await archiveStudent.save();
        res.send(doc);
        console.log('Student archived successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while archiving student!');
    }

    try {
        await Student.findOneAndRemove({_id: studentId});
        console.log("Archived and deleted student");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while deleting student!');
    }
});

module.exports = router;