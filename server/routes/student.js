const router = require("express").Router();

const Student = require('../models/student');

const addRouter = require("./add");
const deleteRouter = require("./delete");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'student' });
});


router.get("/students", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
        console.log("Got students");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Getting Students');
    }
})

router.use('/add', addRouter);
router.use('/delete', deleteRouter);

module.exports = router;