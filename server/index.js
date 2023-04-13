const express = require('express');
const mongoose = require('mongoose');

const Student = require('./models/student');

require('dotenv').config();
mongoose.set('strictQuery', false);

const app = express();

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