const router = require("express").Router();

router.get('/', function(req, res, next) {
    res.render('home', { title: 'user' });
});


router.get("/metadata", async (req, res) => {
   
})

module.exports = router;