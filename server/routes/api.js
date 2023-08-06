var express = require('express');
var router = express.Router();
const studentsRouter = require("./students");
const usersRouter = require("./users");

router.use('/students', studentsRouter);
router.use('/users', usersRouter);

module.exports = router;
