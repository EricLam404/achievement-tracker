const router = require("express").Router();
const Student = require('../models/student');

router.post('/:classType', async (req, res) => {
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

router.delete('/:classType', async (req, res) => {
    const { studentId, classId, classType } = req.body;
    const classTypes = ['electronics', 'robotics', 'coding'];

    if(!classTypes.includes(classType)){
        res.status(400).send('Invalid class type!');
        return;
    }
    const update = {};
    update[`classes.${classType}`] = {
        _id: classId
    };
    try {
        const doc = await Student.findOneAndUpdate({_id: studentId}, {$pull: update});
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Deleting Class');
    }
});

module.exports = router;