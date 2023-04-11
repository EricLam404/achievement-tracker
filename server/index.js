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


/*

app.use(express.static("../client/build"));

const PORT = process.env.PORT || 5001;

app.listen(PORT);
*/



function API(){
    return [
        {
            time: "11am",
            students: [{
                name: "Student #1",
                electronics: {
                    started: false,
                    classes: []
                },
                coding: {
                    started: false,
                    classes: []
                },
                robotics: {
                    started: true,
                    classes: [
                        {
                            classNumber: 1,
                            classDate: "4/4/2023",
                            classAchievement: "started lesson 1",
                            classLesson: "Lesson 1"
                        },
                        {
                            classNumber: 2,
                            classDate: "4/5/2023",
                            classAchievement: "started lesson 2",
                            classLesson: "Lesson 2"
                        }
                    ]
                }
            },
            {
                name: "Student #2",
                electronics: {
                    started: false,
                    classes: []
                },
                coding: {
                    started: false,
                    classes: []
                },
                robotics: {
                    started: true,
                    classes: [
                        {
                            classNumber: 1,
                            classDate: "4/4/2023",
                            classAchievement: "started lesson 1",
                            classLesson: "Lesson 1"
                        },
                        {
                            classNumber: 2,
                            classDate: "4/5/2023",
                            classAchievement: "started lesson 2",
                            classLesson: "Lesson 2"
                        }
                    ]
                }
            }]
        },
        {
            time: "12pm",
            students: [{
                name: "Student #3",
                electronics: {
                    started: false,
                    classes: []
                },
                coding: {
                    started: false,
                    classes: []
                },
                robotics: {
                    started: true,
                    classes: [
                        {
                            classNumber: 1,
                            classDate: "4/4/2023",
                            classAchievement: "started lesson 1",
                            classLesson: "Lesson 1"
                        },
                        {
                            classNumber: 2,
                            classDate: "4/5/2023",
                            classAchievement: "started lesson 2",
                            classLesson: "Lesson 2"
                        }
                    ]
                }
            },
            {
                name: "Student #4",
                electronics: {
                    started: false,
                    classes: []
                },
                coding: {
                    started: false,
                    classes: []
                },
                robotics: {
                    started: true,
                    classes: [
                        {
                            classNumber: 1,
                            classDate: "4/4/2023",
                            classAchievement: "started lesson 1",
                            classLesson: "Lesson 1"
                        },
                        {
                            classNumber: 2,
                            classDate: "4/5/2023",
                            classAchievement: "started lesson 2",
                            classLesson: "Lesson 2"
                        }
                    ]
                }
            }]
        }
    ];
}

/*
const student = new Student({
    name: 'John',
    email: 'john@example.com',
    dob: '2000-01-01',
    age: 23,
    phone: '555-1234',
    address: '123 Main St, Anytown USA',
    started: new Date(),
    days: [
      {
        day: 'Monday',
        time: '10:00am'
      },
      {
        day: 'Wednesday',
        time: '2:00pm'
      }
    ],
    classes: {
      robotics: [
        {
        classNumber: 1,
        classDate: new Date(),
        classAchievement: 'Completed robot building project',
        classLevel: 'Level 1',
        classLesson: 'Advanced robotics programming'
        }
      ],
      electronics: [
        {
        classNumber: 1,
        classDate: new Date(),
        classAchievement: 'Completed circuit design project',
        classLevel: 'Level 1',
        classLesson: 'Advanced electronics programming'
        }
      ],
      coding: [
        {
        classNumber: 1,
        classDate: new Date(),
        classAchievement: 'Completed coding challenge',
        classLevel: 'Level 2',
        classLesson: 'Introduction to web development'
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
    mongoose.disconnect();
});
*/