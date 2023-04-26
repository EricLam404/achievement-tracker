var express = require('express');
var router = express.Router();
const studentRouter = require("./student");

router.get('/', function(req, res, next) {
  res.render('home', { title: 'api' });
});

router.use('/student', studentRouter);

module.exports = router;
