module.exports = function(app, models, urlApi){

    var child_process = require('child_process');
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var rp = require('request-promise')
    var api = models.myApi;
    var request = require('request');
    var myBot;


    app.get('/bomberCode/:idBot?', function(req, res) {
        myBot=null;
        /*if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {*/
            if(req.params.idBot){
                rp({
                    url: urlApi+"/bot" ,
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: {
                        "idBot" : req.params.idBot
                    }
                }).then(function(body){
                    if(body.code != 0){
                        res.redirect('/myBomberman');
                    }else{
                        if(body.userIdBot != req.session.idUser){
                            res.redirect('/myBomberman');
                        }else{
                            myBot = body;
                            res.render('bomberCode.ejs', {
                                msgError: "",
                                msgSuccess: "",
                                code: fs.readFileSync("./"+body.codeBot, "UTF-8"),
                                name: body.nameBot,
                                idBot: req.params.idBot,
                                session: req.session
                            });
                        }
                    }
                }).catch(function (err) {
                    res.redirect('/myBomberman');
                })
            }else{
                res.render('bomberCode.ejs', {
                    msgError: "",
                    msgSuccess: "",
                    code: "",
                    name: "Mon Bomber",
                    idBot: "",
                    session: req.session
                });
            }
        //}
	});


    app.post('/bomberCode', function(req, res) {
        /*if(req.session.type && req.session.type!=""){
         res.redirect("/");
         }else {*/

            if (!req.body.name) {
                res.render('bomberCode.ejs', {
                    msgError: "Veuillez saisir un nom pour votre Bomber !",
                    msgSuccess: "",
                    code: req.body.bomberEditor,
                    name: "Mon Bomber",
                    idBot : req.body.idBot,
                    session: req.session
                });
            } else if (!req.body.bomberEditor) {
                res.render('bomberCode.ejs', {
                    msgError: "Veuillez saisir un code !",
                    msgSuccess: "",
                    code: "",
                    name: req.body.name,
                    idBot : req.body.idBot,
                    session: req.session
                });
            } else {
                var completePath="";
                if(!myBot) {
                    //Création du fichier de test + ouverture
                    var dir = "botFiles/" + req.session.login + "/";
                    mkdirp(dir, function (err) {
                    });
                    completePath = dir + "testBot.js"
                }else{
                    completePath = "./"+myBot.codeBot;
                }

                fs.writeFile(completePath, req.body.bomberEditor, function (err) {
                    if (err) return console.log(err);
                });

                var workerProcess = child_process.exec('node ' + completePath, function
                    (error, stdout, stderr) {
                    if (error) {
                        
                        var tmp = stderr.split("Error:");
                        tmp = tmp[1].split("\n")
                   
                        res.render('bomberCode.ejs', {
                            msgError: "Error code: " + error.code + "\n stderr: " + tmp[0],
                            msgSuccess: "",
                            code: req.body.bomberEditor,
                            name: req.body.name,
                            idBot : req.body.idBot,
                            session: req.session
                        });
                        /*console.log(error.stack);
                         console.log('Error code: '+error.code);
                         console.log('Signal received: '+error.signal);*/
                    } else {
                        /*Si nouveau bot create sinon update*/

                        if(!myBot) {
                            rp({
                                url: urlApi + "/bot",
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                json: {
                                    "nameBot": req.body.name,
                                    "codeBot":  "",
                                    "winBot": 0,
                                    "loseBot": 0,
                                    "pointBot": 0,
                                    "modeBot": "peaceful",
                                    "userIdBot": req.session.idUser,
                                }
                            }).then(function (body) {
                                /*rename file*/
                                rp({
                                    url: urlApi + "/updateBot",
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    json: {
                                        "codeBot": "botFiles/" + req.session.login + "/"+body.idBot+".js",
                                        "idBot": body.idBot
                                    }
                                }).then(function(body){}).catch(function (err) {})
                                myBot = body
                                myBot.codeBot = "botFiles/" + req.session.login + "/"+body.idBot+".js"
                                fs.rename(completePath, myBot.codeBot)
                                res.render('bomberCode.ejs', {
                                    msgError: "",
                                    msgSuccess: "Bomber prêt au combat !",
                                    code: req.body.bomberEditor,
                                    name: req.body.name,
                                    idBot: body.idBot,
                                    session: req.session
                                });
                            }).catch(function (err) {
                                res.render('bomberCode.ejs', {
                                    msgError: "Erreur lors de la création du Bomber. Merci de réessayer.",
                                    msgSuccess: "",
                                    code: req.body.bomberEditor,
                                    name: req.body.name,
                                    idBot: req.body.idBot,
                                    session: req.session
                                });
                            });
                        }else{

                            rp({
                                url: urlApi + "/updateBot",
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                json: {
                                    "nameBot": req.body.name,
                                    "idBot": myBot.id
                                }
                            }).then(function(body){}).catch(function (err) {})

                            res.render('bomberCode.ejs', {
                                msgError: "",
                                msgSuccess: "Bomber prêt au combat !",
                                code: req.body.bomberEditor,
                                name: req.body.name,
                                idBot: req.body.idBot,
                                session: req.session
                            });
                        }

                    }

                });

                workerProcess.on('exit', function (code) {
                    console.log('Child process exited with exit code ' + code);
                });
            }

        //}
    });

    /**/


}