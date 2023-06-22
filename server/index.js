const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
mongoose.set('strictQuery', false);

const { auth } = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

const corsOptions =  {
    origin: 'http://localhost:3000'
};
  
app.use(cors(corsOptions));
app.use(express.json());


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

app.use(jwtCheck);

app.get('/test', function(req, res, ) {
    res.json("TEST");
});

app.use('/', indexRouter);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});