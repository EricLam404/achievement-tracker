var express = require('express');
var router = express.Router();
const studentRouter = require("./student");
const userRouter = require("./user");

router.get('/', function(req, res, next) {
  res.render('home', { title: 'api' });
});

router.use('/student', studentRouter);
router.use('/user', userRouter);

module.exports = router;
