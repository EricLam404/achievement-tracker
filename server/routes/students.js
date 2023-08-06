const router = require("express").Router();
var axios = require("axios").default;

const Student = require('../models/student');
const Archive = require('../models/archive');

const classesRouter = require('./classes');
const timesRouter = require('./times');

router.get("/", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Getting Students');
    }
})

router.post("/student", async(req, res) => {
    let {name, dob} = req.body;
    try {
        let student = await Student.findOne({ name: name, dob: dob });
        let id = student._id;
        var managementAPI = {
            method: 'POST',
            url: 'https://dev-x26mr5lwtu83zf7o.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: new URLSearchParams({
              grant_type: 'client_credentials',
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              audience: process.env.API_AUDIENCE
            })
        };
          
        axios.request(managementAPI).then(function (response) {
            console.log(req.body.user)
            const token = response.data.access_token;
            var options = {
                method: 'PATCH',
                url: 'https://dev-x26mr5lwtu83zf7o.us.auth0.com/api/v2/users/' + req.body.user.sub,
                headers: {authorization: 'Bearer ' + token, 'content-type': 'application/json'},
                data: {app_metadata: {profile: {
                    ...req.body.user['http://localhost:3000//app_metadata/profile'],
                    student_id: id
                }}}
            };
        
            axios.request(options).then(function (response) {              
                res.json(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }).catch(function (error) {
            console.error(error);
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Error Getting Student ${name} `);
    }
})

router.get("/:id", async(req, res) => {
    try {
        let student_id = req.params.id;
        let student = await Student.findOne({ _id: student_id });
        res.json(student);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Error Getting Student`);
    }
})

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const { studentId } = req.body;
    try {
        const doc = await Student.findOneAndRemove({_id: studentId});
        res.send(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error Deleting Student');
    }
});

router.put('/archive/:id', async (req, res) => {
    const { studentId } = req.body;
    const deletedStudent = await Student.findOne({_id: studentId});
    const student = deletedStudent.toJSON();
    const archiveStudent = new Archive({ student: student });

    try {
        const doc = await archiveStudent.save();
        res.send(doc);
        console.log('Student archived successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while archiving student!');
    }

    try {
        await Student.findOneAndRemove({_id: studentId});
        console.log("Archived and deleted student");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while deleting student!');
    }
});

router.use('/classes', classesRouter);
router.use('/times', timesRouter);


module.exports = router;