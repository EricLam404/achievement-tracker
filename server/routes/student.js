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

router.use('/add', addRouter);
router.use('/delete', deleteRouter);
router.use('/archive', archiveRouter);

module.exports = router;