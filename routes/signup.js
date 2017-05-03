/**
 * Created by iPlowPlow on 03/05/2017.
 */
module.exports = function(app, models, urlApi){

    var rp = require('request-promise')
    var api = models.myApi;

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form

    app.get('/signup', function(req, res, next) {

        if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {
            res.render('signup.ejs', {msgError: "", msgSuccess: "", session: req.session});
        }
    });

    // process the signup form
    app.post('/signup', function (req, res, next) {
        if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {
            if (!req.body.username){
                res.render('signup.ejs', {msgError:"Veuillez saisir un login !", msgSuccess: "", session : req.session});
            }else if(!req.body.password){
                res.render('signup.ejs', {msgError:"Veuillez saisir un mot de passe !", msgSuccess: "", session : req.session});
            }else if(!req.body.passwordConfirm){
                res.render('signup.ejs', {msgError:"Veuillez retaper votre mot de passe", msgSuccess: "", session : req.session});
            }else if(req.body.password!=req.body.passwordConfirm){
                res.render('signup.ejs', {msgError:"Les mots de passe saisient ne sont pas identiques !", msgSuccess: "", session : req.session});
            }else{
                rp({
                    url: urlApi+"/user" ,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: {
                        "loginUser": req.body.username,
                        "passwordUser" : req.body.password,
                        "emailUser": req.body.mail
                    }
                }).then(function(body){
                    res.render('signup.ejs', {msgError:"", msgSuccess: "Inscription validée !", session : req.session});
                }).catch(function (err) {
                    res.render('signup.ejs', {msgError: "Erreur veuillez lors de l'inscription. Veuillez recommmencer !", msgSuccess: "", session : req.session});
                });
            }
        }
    });
};