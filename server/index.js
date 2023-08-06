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
app.use(jwtCheck);

const apiRouter = require("./routes/api");

const mongoDB = process.env.DatabaseLogin;  
main();

app.use("/api", apiRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

async function main() {
    try {
        mongoose.connect(mongoDB);
        console.log('Database connected successfully!');
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
}