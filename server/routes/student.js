const router = require("express").Router();

const Student = require('../models/student');

const addRouter = require("./add");
const deleteRouter = require("./delete");
const archiveRouter = require("./archive");

router.get('/', function(req, res, next) {
    res.render('home', { title: 'student' });
});


router.get("/students", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Getting Students');
    }
})

router.get("/student", async(req, res) => {
    let name = req.body.profile.child_name;
    let dob = req.body.profile.child_dob;
    try {
        Student.findOne({ name: name, dob: dob }, (err, student) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!student) {
                return res.status(404).send('Student not found');
            }
            res.send(student);
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Error Getting Student ${name} `);
    }
})

router.use('/add', addRouter);
router.use('/delete', deleteRouter);
router.use('/archive', archiveRouter);

module.exports = router;