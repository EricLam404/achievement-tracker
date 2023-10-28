const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
mongoose.set("strictQuery", false);

const { auth } = require("express-oauth2-jwt-bearer");
const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});

const corsOptions = {
    origin: "http://localhost:3000",
};

const studentsRouter = require("./routes/students");
const usersRouter = require("./routes/users");
const publicRouter = require("./routes/public");

const apiVersion = "/api"

app.use(cors(corsOptions));
app.use(express.json());

app.use(`${apiVersion}/public`, publicRouter);

const mongoDB = process.env.DATABASE_LOGIN;
main();

app.use(jwtCheck);
app.use(`${apiVersion}/students`, studentsRouter);
app.use(`${apiVersion}/users`, usersRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

async function main() {
    try {
        mongoose.connect(mongoDB);
        console.log("Database connected successfully!");
    } catch (err) {
        console.log("Error connecting to the database:", err);
    }
}
