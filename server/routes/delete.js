const router = require("express").Router();

const Student = require('../models/student');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'delete' });
});

router.delete('/student', async (req, res) => {
    const { studentId } = req.body;
    try {
        const doc = await Student.findOneAndRemove({_id: studentId}, (err, deletedStudent));
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Deleting Student');
    }
});

router.delete('/class/:classType', async (req, res) => {
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
        const doc = await Student.findOneAndUpdate({_id: id}, {$pull: update});
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Deleting Class');
    }
});

router.delete('/time', async (req, res) => {
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