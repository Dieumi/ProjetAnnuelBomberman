module.exports = function(app, urlApi){
    var rp = require("request-promise");

    app.get("/profile/:id", function(req, res, next) {
        rp({
            url: urlApi + "/user/profile/" + req.params.id,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (body) {
            var profileBody = body;
            var idProfile = JSON.parse(body).idUser;
            rp({
                url: urlApi + "/botByUser",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: {
                    "userIdBot": idProfile
                }
            }).then(function (body) {
                var bots = body;
                rp({
                    url: urlApi + "/matchs/" + req.params.id,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (body) {
                    res.render("profile.ejs", {
                        session: req.session,
                        profile: profileBody,
                        listBot: bots,
                        matchs: body
                    });

                });
            });
        });
    })};