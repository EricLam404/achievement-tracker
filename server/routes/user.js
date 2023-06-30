const router = require("express").Router();
var axios = require("axios").default;

router.get('/', function(req, res, next) {
    res.render('home', { title: 'user' });
});


router.post("/metadata", async (req, res) => {
    var managementAPI = {
        method: 'POST',
        url: 'https://dev-x26mr5lwtu83zf7o.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: process.env.API_AUDIENCE
        })
    };
      
    axios.request(managementAPI).then(function (response) {
        const token = response.data.access_token;
        var options = {
            method: 'PATCH',
            url: 'https://dev-x26mr5lwtu83zf7o.us.auth0.com/api/v2/users/' + req.body.user.sub,
            headers: {authorization: 'Bearer ' + token, 'content-type': 'application/json'},
            data: {user_metadata: {profile: req.body.profile}}
        };
    
        axios.request(options).then(function (response) {        
            res.json(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }).catch(function (error) {
        console.error(error);
    });
})

module.exports = router;