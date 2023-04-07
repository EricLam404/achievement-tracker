const express = require('express');

const app = express();

const students = [
    {
        name: "Student #1",
        electronics: {
            started: false,
            classes: {}
        },
        coding: {
            started: false,
            classes: {}
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
            classes: {}
        },
        coding: {
            started: false,
            classes: {}
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
    }
];

app.get("/student", (req, res) => {
    res.json(student);
})

app.listen(5001, () => {console.log("Server started on port 5001")});
/*

app.use(express.static("../client/build"));

const PORT = process.env.PORT || 5001;

app.listen(PORT);
*/