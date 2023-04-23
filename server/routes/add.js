const router = require("express").Router();

const Student = require('../models/student');
const Archive = require('../models/archive');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'add' });
});

router.post('/class/:classType', async (req, res) => {
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

router.post('/time', async (req, res) => {
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

router.post('/student', async (req, res) => {
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

module.exports = router;