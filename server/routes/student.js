const router = require("express").Router();
var axios = require("axios").default;

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

router.get("/student/:id", async(req, res) => {
    try {
        let student_id = req.params.id;
        let student = await Student.findOne({ _id: student_id });
        res.json(student);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Error Getting Student`);
    }
})

router.use('/add', addRouter);
router.use('/delete', deleteRouter);
router.use('/archive', archiveRouter);

module.exports = router;