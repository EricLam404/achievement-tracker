const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

const mongoDB = process.env.DatabaseLogin;

async function main() {
    try {
        mongoose.connect(mongoDB);
        console.log('Database connected successfully!');
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
}
  
main();

const studentRouter = require("./routes/student");

app.use("/", (req, res) => {
    res.send('welcome to the server home page')
})

app.use("/api/students", studentRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});