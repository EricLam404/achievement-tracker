const router = require("express").Router();

const Student = require('../models/student');
const Archive = require('../models/archive');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'delete' });
});

router.delete('/student', async (req, res) => {
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
    Student.findOneAndUpdate({_id: id},
        {$pull: update},
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

router.delete('/time', async (req, res) => {
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