const router = require("express").Router();

router.get('/', function(req, res, next) {
    res.render('home', { title: 'user' });
});


router.post("/metadata", async (req, res) => {
    res.send(req.body);
})

module.exports = router;