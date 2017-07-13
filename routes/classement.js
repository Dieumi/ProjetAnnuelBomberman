module.exports = function(app, urlApi){
    // ===========================================
    // CLASSEMENT PAGE (with login links) ========
    // ===========================================
    var rp = require("request-promise");

    app.get("/classement/:limit/:page", function(req, res) {
        rp({
            url: urlApi + "/classementBot/" + req.params.limit + "/" + req.params.page,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(body) {
            res.render("classement.ejs", {
                session : req.session,
                top : body,
                currentPage : req.params.page
            });
        });
    });
};