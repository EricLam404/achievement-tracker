const router = require("express").Router();

const Student = require('../models/student');

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

    try {
        const doc = await Student.findOneAndUpdate({_id: id}, {$push: update});
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Adding Class');
    }
});

router.post('/time', async (req, res) => {
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
    try {
        const doc = await student.save();
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Adding Student');
    }
});

module.exports = router;