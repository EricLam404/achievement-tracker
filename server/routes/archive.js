const router = require("express").Router();

const Student = require('../models/student');
const Archive = require('../models/archive');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'archive' });
});

router.delete('/student', async (req, res) => {
    const { studentId } = req.body;
    Student.findOne({_id: studentId}, (err, deletedStudent) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while finding student!');
        } else {
            const student = deletedStudent.toJSON();
            const archiveStudent = new Archive( { student: student });
            console.log(archiveStudent.student.classes.robotics);

            archiveStudent.save((err, doc) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error while archiving student!');
                } else {
                    res.send(doc);
                    console.log('Student archived successfully!');
                }
            });

        }
    });
    Student.findOneAndRemove({_id: studentId}, (err, deletedStudent) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while deleting student!');
        } else {
            console.log("archived and deleted student");
        };
    })
});

module.exports = router;