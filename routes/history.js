module.exports = function(app, urlApi){
	// ===========================================
	// CLASSEMENT PAGE (with login links) ========
	// ===========================================
	var rp = require("request-promise");

	app.get("/history/:idBot", function(req, res, next) {
        rp({
            url: urlApi + "/matchs/" + req.params.idBot,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (body) {
            res.render("history.ejs", {
                session: req.session,
                myId: req.params.idBot,
                matchs: body
            });
        });
	});
};