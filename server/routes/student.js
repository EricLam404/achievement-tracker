const router = require("express").Router();

const Student = require('../models/student');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'student' });
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

module.exports = router;