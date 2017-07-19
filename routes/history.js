module.exports = function (app, urlApi) {
    // ===========================================
    // CLASSEMENT PAGE (with login links) ========
    // ===========================================
    var rp = require("request-promise");

    app.get("/history/:idBot", function (req, res, next) {
        if (!req.session.type) {
            res.redirect("/");
        } else {

            rp({
                url: urlApi + "/historyBot",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: {
                    "idBot": req.params.idBot
                }
            }).then(function (body) {

                
                res.render("history.ejs", {
                    session: req.session,
                    myId: req.params.idBot,
                    matchs: body
                });
            });
        }
    });
    
};