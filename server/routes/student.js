const router = require("express").Router();

const Student = require('./models/student');
const Archive = require('./models/archive');

router.get("/student", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/add-class/:classType', async (req, res) => {
    const { id, classNumber, classDate, classAchievement, classLesson, classType, classLevel } = req.body;
    const classTypes = ['electronics', 'robotics', 'coding'];

    if(!classTypes.includes(classType)){
        res.status(400).send('Invalid class type!');
        return;
    }
    const update = {};
    update[`classes.${classType}`] = {
        classNumber: classNumber,
        classDate: classDate,
        classAchievement: classAchievement,
        classLesson: classLesson,
        classLevel: classLevel
    };
    Student.findOneAndUpdate({_id: id},
        {$push: update},
        (err, doc) =>{
            if (err) {
                console.log(err);
                res.status(500).send('Error while adding class!');
            } else {
                res.send(doc);
            }
        }
    );
});

router.post('/add-time', async (req, res) => {
    const { id, day, time } = req.body;
    const update = {};
    update[`days`] = {
        day: day,
        time: time
    };
    Student.findOneAndUpdate({_id: id},
        {$push: update},
        (err, doc) =>{
            if (err) {
                console.log(err);
                res.status(500).send('Error while adding timeslot!');
            } else {
                res.send(doc);
            }
        }
    );
});

router.post('/add-student', async (req, res) => {
    const { 
        name,
        email,
        dob,
        age,
        phone,
        address,
        started,
        days,
        classes 
    } = req.body;

    const student = new Student({
        name: name,
        email: email,
        dob: dob,
        age: age,
        phone: phone,
        address: address,
        started: started,
        days: days,
        classes: classes
    });
    student.save((err, doc) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while creating student!');
        } else {
            res.send(doc.classes.robotics);
            console.log('Student saved successfully!');
        }
    });
});

router.delete('/archive-student', async (req, res) => {
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

router.delete('/delete-student', async (req, res) => {
    const { studentId } = req.body;
    Student.findOneAndRemove({_id: studentId}, (err, deletedStudent) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while deleting student!');
        } else {
            res.send(deletedStudent);
            console.log('Student deleted!');
        }
    });
});

router.delete('/delete-class/robotics', async (req, res) => {
    const { studentId, classId } = req.body;
    Student.findOneAndUpdate({_id: studentId},
        {$pull: {
            'classes.robotics': {
                _id: classId
            }
        }},
        (err, doc) =>{
            if (err) {
                console.log(err);
                res.status(500).send('Error while deleting class!');
            } else {
                res.send(doc.classes.robotics);
            }
        }
    );
});

router.delete('/delete-time', async (req, res) => {
    const { studentId, timeId } = req.body;
    Student.findOneAndUpdate({_id: studentId},
        {$pull: {
            'days': {
                _id: timeId
            }
        }},
        (err, doc) =>{
            if (err) {
                console.log(err);
                res.status(500).send('Error while deleting time!');
            } else {
                res.send(doc.days);
            }
        }
    );
});

module.exports = router;