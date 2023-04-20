const express = require('express');
const mongoose = require('mongoose');

const Student = require('./models/student');

require('dotenv').config();
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

const mongoDB = process.env.DatabaseLogin;

async function main() {
    try {
        await mongoose.connect(mongoDB);
        console.log('Database connected successfully!');
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
}
  
main();

app.get("/student", (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(students);
    });
})

app.post('/add-class/:classType', async (req, res) => {
    const { id, classNumber, classDate, classAchievement, classLesson, classType } = req.body;
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
        classLesson: classLesson
    };
    Student.findOneAndUpdate({_id: id},
        {$push: update},
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

app.post('/add-time', async (req, res) => {
    const { id, day, time } = req.body;
    const update = {};
    update[`days`] = {
        day: day,
        time: time
    };
    Student.findOneAndUpdate({_id: id},
        {$push: update},
        (err, doc) =>{
            if (err) {
                console.log(err);
                res.status(500).send('Error while adding timeslot!');
            } else {
                res.send(doc);
            }
        }
    );
});

app.delete('/delete-class/robotics', async (req, res) => {
    const { studentId, classId } = req.body;
    Student.findOneAndUpdate({_id: studentId},
        {$pull: {
            'classes.robotics': {
                _id: classId
            }
        }},
        (err, doc) =>{
            if (err) {
                console.log(err);
                res.status(500).send('Error while deleting class!');
            } else {
                res.send(doc.classes.robotics);
            }
        }
    );
});

app.delete('/delete-time', async (req, res) => {
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

app.listen(5001, () => {console.log("Server started on port 5001")});

function createStudent(name, day, time){
    const student = new Student({
        name: name,
        email: name + '@gmail.com',
        dob: '01/01/2001',
        age: 23,
        phone: '123-123-1234',
        address: '123 Main St, USA',
        started: new Date(),
        days: [
            {
                day: day,
                time: time
            },
            {
                day: "Saturday",
                time: "11:00"
            }
        ],
        classes: {
        robotics: [
            {
            classNumber: 1,
            classDate: new Date(),
            classAchievement: 'Completed robotics project',
            classLevel: 'Level 1',
            classLesson: 'Lesson 1'
            }
        ],
        electronics: [
            {
            classNumber: 1,
            classDate: new Date(),
            classAchievement: 'Completed electronic project',
            classLevel: 'Level 1',
            classLesson: 'Lesson 1'
            }
        ],
        coding: [
            {
            classNumber: 1,
            classDate: new Date(),
            classAchievement: 'Completed coding project',
            classLevel: 'Level 2',
            classLesson: 'Lesson 1'
            }
        ]
        }
    });
    student.save((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Student saved successfully!');
        }
    });
}