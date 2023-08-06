const router = require("express").Router();
var axios = require("axios").default;

const Student = require('../models/student');
const Archive = require('../models/archive');

const classesRouter = require('./classes');
const timesRouter = require('./times');

router.get("/", async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).send({
            message: 'Error Getting Students',
            error: err
        });
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

router.get("/:student_id", async(req, res) => {
    try {
        const { student_id } = req.params;
        let student = await Student.findOne({ _id: student_id });
        res.status(200).json(student);
        
    } catch (err) {
        res.status(500).send({
            message: `Error Getting Student`,
            error: err
        });
    }
})

router.post('/', async (req, res) => {
    try {
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
    
        const studentObject = new Student({
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
        const student = await studentObject.save();
        res.send(student);
    } catch (err) {
        res.status(500).send({
            message: 'Error Adding Student',
            error: err
        });
    }
});

router.delete('/:student_id', async (req, res) => {
    try {
        const { student_id } = req.params;
        const deletedStudent = await Student.findOneAndRemove({_id: student_id});
        res.status(200).send(deletedStudent);
    } catch (err) {
        res.status(500).send({
            message: 'Error Deleting Students',
            error: err
        });
    }
});

router.put('/archive/:student_id', async (req, res) => {
    try {
        const { student_id } = req.params;
        const deletedStudent = await Student.findOne({_id: student_id});
        const archiveStudentObject = new Archive({ student: deletedStudent.toJSON() });
        const archivedStudent = await archiveStudentObject.save();
        await Student.findByIdAndRemove(student_id);
        res.status(200).send(archivedStudent);
    } catch (err) {
        res.status(500).send({
            message: 'Error while archiving student!',
            error: err
        });
    }
});

router.use('/:student_id/classes', classesRouter);
router.use('/:student_id/times', timesRouter);


module.exports = router;