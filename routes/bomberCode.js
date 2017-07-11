module.exports = function(app, models, urlApi){

    var child_process = require("child_process");
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var rp = require("request-promise");
    var request = require("request");
    var myBot;
    var players = "function Player(t,i,n){this.context=t,this.name=i||\"Whale\",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){},this.isObstacle = function (x, y){},this.isWall = function (x, y) { }, this.isEmpty = function (x, y) { }, this.isBomb = function (x, y) { }, this.isBomber = function(x, y){} };var player = new Player(null, \"test\", null);";

    app.get("/bomberCode/:idBot?", function (req, res) {
        myBot=null;
        /*if(req.session.type && req.session.type!=""){
         res.redirect("/");
         }else {*/
        if(req.params.idBot) {
            rp({
                url: urlApi+"/bot",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: {
                    "idBot" : req.params.idBot
                }
            }).then(function(body){
                if(body.code != 0) {
                    res.redirect("/myBomberman");
                } else {
                    if(body.userIdBot != req.session.idUser) {
                        res.redirect("/myBomberman");
                    } else {
                        myBot = body;
                        var allCode = fs.readFileSync("./" + body.codeBot, "UTF-8");
                        // on retire la def des fonctions
                        var theCode = "";
                        if (allCode != "") {
                            theCode = allCode.replace("var Code = function (){ \n\r this.exec = function() {", "");
                            theCode = theCode.substring(0, theCode.length - 3);
                        }

                        res.render("bomberCode.ejs", {
                            msgError: "",
                            msgSuccess: "",
                            code: theCode,
                            name: body.nameBot,
                            modeBot: body.modeBot,
                            idBot: req.params.idBot,
                            session: req.session
                        });
                    }
                }
            }).catch(function (err) {
                res.redirect("/myBomberman");
            });
        } else {
            res.render("bomberCode.ejs", {
                msgError: "",
                msgSuccess: "",
                code: "",
                name: "Mon Bomber",
                idBot: "",
                modeBot: "",
                session: req.session
            });
        }
        //}
    });

    app.post("/bomberCode/testInGame", function (req, res) {
        /*if(req.session.type && req.session.type!=""){
         res.redirect("/");
         }else {*/

        if (!req.body.name) {
            res.render("bomberCode.ejs", {
                msgError: "Veuillez saisir un nom pour votre Bomber !",
                msgSuccess: "",
                code: req.body.bomberEditor,
                name: "Mon Bomber",
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session
            });
        } else if (!req.body.bomberEditor) {
            res.render("bomberCode.ejs", {
                msgError: "Veuillez saisir un code !",
                msgSuccess: "",
                code: "",
                name: req.body.name,
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session
            });
        } else {
            var error = "";
            var F = new Function(players + "\n\r" + req.body.bomberEditor);
            try {
                F();
            } catch (e) {
                console.log(e);
            }

            if (error != "") {
                res.render("bomberCode.ejs", {
                    msgError: "" + error,
                    msgSuccess: "",
                    code: req.body.bomberEditor,
                    name: req.body.name,
                    idBot: req.body.idBot,
                    modeBot: req.body.modeBot,
                    session: req.session
                });
            } else {
                res.render("index.ejs", {
                    session: req.session,
                    idAd: req.body.idAd,
                    idBotAd: req.body.idbotAd,
                    idBot: req.body.idbot,
                    iduser: req.body.iduser,
                    namebot: req.body.namebot,
                    namebotAd: req.body.namebotAD,
                    api: urlApi,
                    codeBot: req.body.codeBot,
                    codeBotAd: req.body.codeBotAd
                });
            }
        }
        //}
    });

    app.post("/bomberCode", function(req, res) {
        /*if(req.session.type && req.session.type!=""){
         res.redirect("/");
         }else {*/

        if (!req.body.name) {
            res.render("bomberCode.ejs", {
                msgError: "Veuillez saisir un nom pour votre Bomber !",
                msgSuccess: "",
                code: req.body.bomberEditor,
                name: "Mon Bomber",
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session
            });
        } else if (!req.body.bomberEditor) {
            res.render("bomberCode.ejs", {
                msgError: "Veuillez saisir un code !",
                msgSuccess: "",
                code: "",
                name: req.body.name,
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session
            });
        } else {
            var error = "";
            try {
                var F = new Function(players + "\n\r" + req.body.bomberEditor);
                F();
            } catch (e) {
                console.log(e);
            }

            if (error != "") {
                res.render("bomberCode.ejs", {
                    msgError: "" + error,
                    msgSuccess: "",
                    code: req.body.bomberEditor,
                    name: req.body.name,
                    idBot: req.body.idBot,
                    modeBot: req.body.modeBot,
                    session: req.session
                });
            } else {
                var completePath = "";
                //Création du fichier de test + ouverture
                var dir = "botFiles/" + req.session.login + "/";
                mkdirp(dir, function (err) {
                });
                completePath = dir + "testBot.js";

                //completePath = "./" + myBot.codeBot;

                fs.writeFile(completePath, "var Code = function (){ \n\r this.exec = function() {\n\r " + req.body.bomberEditor + "\n\r } }" , function (err) {
                    if (err) {
                        return err;
                    }
                });

                /*Si nouveau bot create sinon update*/

                if (!myBot) {
                    rp({
                        url: urlApi + "/bot",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        json: {
                            "nameBot": req.body.name,
                            "codeBot": "",
                            "winBot": 0,
                            "loseBot": 0,
                            "pointBot": 0,
                            "modeBot": req.body.modeBot,
                            "userIdBot": req.session.idUser
                        }
                    }).then(function (body) {
                        rp({
                            url: urlApi + "/updateBot",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            json: {
                                "codeBot": "botFiles/" + req.session.login + "/" + body.idBot + ".js",
                                "idBot": body.idBot
                            }
                        }).then(function (body) { }).catch(function (err) { });
                        myBot = body;
                        myBot.codeBot = "botFiles/" + req.session.login + "/" + body.idBot + ".js";
                        fs.rename(completePath, myBot.codeBot);
                        res.render("bomberCode.ejs", {
                            msgError: "",
                            msgSuccess: "Bomber prêt au combat !",
                            code: req.body.bomberEditor,
                            name: req.body.name,
                            idBot: body.idBot,
                            modeBot: req.body.modeBot,
                            session: req.session
                        });
                    }).catch(function (err) {
                        res.render("bomberCode.ejs", {
                            msgError: "Erreur lors de la création du Bomber. Merci de réessayer.",
                            msgSuccess: "",
                            code: req.body.bomberEditor,
                            name: req.body.name,
                            modeBot: req.body.modeBot,
                            idBot: req.body.idBot,
                            session: req.session
                        });
                    });
                } else {
                    myBot.codeBot = "botFiles/" + req.session.login + "/" + myBot.idBot + ".js";
                    fs.writeFile(myBot.codeBot, "var Code = function (){ \n\r this.exec = function() {\n\r " + req.body.bomberEditor + "\n\r } }", function (err) {
                        if (err) return console.log(err);
                    });
                    rp({
                        url: urlApi + "/updateBot",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        json: {
                            "nameBot": req.body.name,
                            "idBot": myBot.idBot,
                            "modeBot" : req.body.modeBot
                        }
                    }).then(function (body) { }).catch(function (err) { });
                    res.render("bomberCode.ejs", {
                        msgError: "",
                        msgSuccess: "Bomber prêt au combat !",
                        code: req.body.bomberEditor,
                        name: req.body.name,
                        modeBot: req.body.modeBot,
                        idBot: req.body.idBot,
                        session: req.session
                    });
                }
            }
        }
        //}
    });
    /**/
};