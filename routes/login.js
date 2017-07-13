module.exports = function(app, models, urlApi){

    var msgError = "";
    var bcrypt = require("bcrypt-nodejs");
    var rp = require("request-promise");
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get("/login", function(req, res) {
        if(req.session.type && req.session.type != "") {
            res.redirect("/");
        }else{
            res.render("login.ejs", { msgError: "", session : req.session });
        }
    });

    // process the login form
    app.post("/login", function (req, res, next) {
        if(req.session.type && req.session.type != "") {
            res.redirect("/");
        } else {
            msgError="";
            if(!req.body.login){
                msgError = "Veuillez saisir votre identifiant ! ";
                res.render("login.ejs", {msgError:msgError, session : req.session});
            } else if(!req.body.password) {
                msgError = "Veuillez saisir votre mot de passe ! ";
                res.render("login.ejs", {msgError:msgError, session : req.session});
            } else {
                rp({
                    url: urlApi+"/user/auth" ,
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    json:{
                        "loginUser": req.body.login,
                        "passwordUser":req.body.password
                    }
                }).then(function(body){
                    if(body){
                        if(body.code == "0") {
                            req.session.cookie.maxAge = 1000 * 60 * 60;
                            req.session.idUser = body.idUser;
                            req.session.login = body.loginUser;
                            req.session.type = body.typeUser;
                            res.redirect("/");
                        } else {
                            res.render("login.ejs", { msgError: "Erreur combinaison login/mot de passe", session : req.session });
                        }
                    }else {
                        res.render("login.ejs", { msgError: "Erreur combinaison login/mot de passe", session : req.session });
                    }
                }).catch(function(err){
                    res.render("login.ejs", { msgError: "Erreur inconnu. Merci de réesayer.", session : req.session });
                });
            }
        }
    });
};