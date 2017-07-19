module.exports = function (app, models, urlApi) {

    var rp = require("request-promise");
    var currentApi = models.myApi;

    app.get("/bomberGame", function (req, res) {
        if (!req.session.type) {
            res.redirect("/");
        } else {
            //On recup la liste de bot :
            rp({
                url: urlApi + "/botByUser",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: {
                    "userIdBot": req.session.idUser
                }
            }).then(function (body) {
                res.render("bomberGame.ejs", {
                    session: req.session,
                    listBot: body,
                    api: currentApi
                });
            });
        }
    });
};