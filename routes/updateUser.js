/**
 * Created by rfruitet on 19/07/2017.
 */
module.exports = function(app, models, urlApi){

    var rp = require("request-promise");

    app.get("/updateUser/:idUser", function(req, res, next) {

        if(req.session.type && req.session.type != "" && req.session.idUser != req.params.idUser){
            res.redirect("/");
        } else {
            res.render("updateUser.ejs", {idUser : req.params.idUser, msgError: "", msgSuccess: "", session: req.session});
        }
    });

    app.post("/updateUser", function (req, res, next) {
   
            console.log("aaaaaaaa");
            if(!req.body.password) {
                res.render("updateUser.ejs", {
                    msgError:"Veuillez saisir un mot de passe !", msgSuccess: "",
                    session : req.session
                });
            } else {
                rp({
                    url: urlApi + "/updateMyUser",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    json: {
                        "idUser": req.session.idUser,
                        "passwordUser": req.body.password
                    }
                }).then(function(body) {

                    res.redirect("/");
                });
            }

    });
};
