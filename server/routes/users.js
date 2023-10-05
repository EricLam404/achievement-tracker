const router = require("express").Router();
var axios = require("axios").default;

router.post("/metadata/:refresh_token", async (req, res) => {
    const { refresh_token } = req.params;
    var managementAPI = {
        method: "POST",
        url: `https://dev-x26mr5lwtu83zf7o.us.auth0.com/oauth/token`,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            audience: process.env.API_AUDIENCE,
        }),
    };

    axios
        .request(managementAPI)
        .then(function (response) {
            const token = response.data.access_token;
            var updateMetadata = {
                method: "PATCH",
                url:
                    `https://dev-x26mr5lwtu83zf7o.us.auth0.com/api/v2/users/` +
                    req.body.user.sub,
                headers: {
                    authorization: "Bearer " + token,
                    "content-type": "application/json",
                },
                data: { user_metadata: { profile: req.body.profile } },
            };

            axios
                .request(updateMetadata)
                .then(function (response) {
                    var options = {
                        method: "POST",
                        url: "https://dev-x26mr5lwtu83zf7o.us.auth0.com/oauth/token",
                        headers: { "content-type": "application/x-www-form-urlencoded" },
                        data: new URLSearchParams({
                            grant_type: "refresh_token",
                            client_id: `${process.env.CLIENT_ID}`,
                            client_secret: `${process.env.CLIENT_SECRET}`,
                            refresh_token: `${refresh_token}`,
                        }),
                    };
                
                    axios
                        .request(options)
                        .then(function (response) {
                            res.status(200).send(response.data);
                        })
                        .catch(function (error) {
                            console.error(error);
                            res.status(500).send({
                                error: error,
                            });
                        });
                })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).send({
                        error: error,
                    });
                });
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send({
                error: error,
            });
        });
});
module.exports = router;
