const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    var origin = req.headers.origin;
    if (origin === 'https://client-production-6461.up.railway.app'){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const indexRouter = require("./routes/home");
const apiRouter = require("./routes/api");

app.set('view engine', 'pug');

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

app.use('/', indexRouter);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});