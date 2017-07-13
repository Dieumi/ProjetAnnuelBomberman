module.exports = function (app, models, urlApi) {

    var child_process = require('child_process');
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var rp = require('request-promise');
    var api = models.myApi;
    var request = require('request');
    var myBot;
    var players = "function Player(t,i,n){this.context=t,this.name=i||\"Whale\",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){},this.isObstacle = function (x, y){},this.isWall = function (x, y) { }, this.isEmpty = function (x, y) { }, this.isBomb = function (x, y) { }, this.isBomber = function(x, y){} };var player = new Player(null, \"test\", null);";
    var playerEnd;
    var player;
    var gameFunction = "";
    var avatar = "";
    app.get('/bomberCode/:idBot?', function (req, res) {
        myBot = null;
        avatar = "";
        player = "function Player(t,i,n){";
        playerEnd = "};var player = new Player(null, \"test\", null);";
        /*if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {*/

        rp({
            url: urlApi + "/gameApiDesc",
            method: "GET"
        }).then(function (body) {
            gameFunction = JSON.parse(body)
            var tmpP = "";
            var paramsFunc;
            var parmsRdy = "";
            for (var i = 0; i < gameFunction.length; i++) {
                parmsRdy = "";
                paramsFunc = gameFunction[i].paramGameApiDesc.split(",");
                for (var j = 0; j < paramsFunc.length; j++) {
                    parmsRdy = parmsRdy + paramsFunc[j].trimLeft().split(" ")[1] + ",";
                }
                tmpP = tmpP + "this." + gameFunction[i].nameGameApiDesc + " = function (" + parmsRdy.substring(0, parmsRdy.length - 1) + ") { },"
            }
            player = player + tmpP.substring(0, tmpP.length - 1) + playerEnd;

            if (req.params.idBot) {
                rp({
                    url: urlApi + "/bot",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: {
                        "idBot": req.params.idBot
                    }
                }).then(function (body) {
                    if (body.code != 0) {
                        res.redirect('/myBomberman');
                    } else {
                        if (body.userIdBot != req.session.idUser) {
                            res.redirect('/myBomberman');
                        } else {
                            avatar = req.body.avatarBot;
                            myBot = body;
                            var allCode = fs.readFileSync("./" + body.codeBot, "UTF-8");
                            // on retire la def des fonctions
                            var code = "";
                            if (allCode != "") {
                                code = allCode.replace("var Code = function (){ \n\r this.exec = function() {", "");
                                code = code.substring(0, code.length - 3);
                            }

                            res.render('bomberCode.ejs', {
                                msgError: "",
                                msgSuccess: "",
                                code: code,
                                name: body.nameBot,
                                modeBot: body.modeBot,
                                idBot: req.params.idBot,
                                session: req.session,
                                gameFunc: gameFunction
                            });
                        }
                    }
                }).catch(function (err) {
                    res.redirect('/myBomberman');
                });
            } else {
                res.render('bomberCode.ejs', {
                    msgError: "",
                    msgSuccess: "",
                    code: "",
                    name: "Mon Bomber",
                    idBot: "",
                    modeBot: "",
                    session: req.session,
                    gameFunc: gameFunction
                });
            }
        }).catch(function (err) {
            res.redirect('/myBomberman');
        })
        //}
    });

    app.post('/bomberCode/testInGame', function (req, res) {
        /*if(req.session.type && req.session.type!=""){
         res.redirect("/");
         }else {*/

        if (!req.body.name) {
            res.render('bomberCode.ejs', {
                msgError: "Veuillez saisir un nom pour votre Bomber !",
                msgSuccess: "",
                code: req.body.bomberEditor,
                name: "Mon Bomber",
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session,
                gameFunc: gameFunction
            });
        } else if (!req.body.bomberEditor) {
            res.render('bomberCode.ejs', {
                msgError: "Veuillez saisir un code !",
                msgSuccess: "",
                code: "",
                name: req.body.name,
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session,
                gameFunc: gameFunction
            });
        } else {
            var erreur = "";
            try {
                var F = new Function(player + "\n\r" + req.body.bomberEditor);
                F();
            } catch (e) {
                if (e.name == "ReferenceError") {
                    var stack = e.stack.split("\n");
                    var lignes = stack[1].split(":");
                    var ligne = lignes[4] - 3;
                    erreur = e.name + ": " + e.message + " at ligne " + ligne;
                } else if (e.name == "SyntaxError") {
                    erreur = e.name + ": " + e.message;
                } else {
                    erreur = e.name + ": " + e.message;
                }
            }


            if (erreur != "") {

                res.render('bomberCode.ejs', {
                    msgError: "" + erreur,
                    msgSuccess: "",
                    code: req.body.bomberEditor,
                    name: req.body.name,
                    idBot: req.body.idBot,
                    modeBot: req.body.modeBot,
                    session: req.session,
                    gameFunc: gameFunction
                });

            } else {
                var codeBot = "botFiles/" + req.session.login + "/" + req.body.idBot + ".js";
                var codeBotAd = "botFiles/testBot/testBot.js";
                var file = codeBot.substring(8, codeBot.length);
                var fileP2 = codeBotAd.substring(8, codeBotAd.length - 3) + "P2.js";
                var contentP2 = fs.readFileSync("./" + codeBotAd, "UTF-8");
                contentP2 = contentP2.replace(/player/g, "player2");


                fs.writeFile("botFiles/" + fileP2, contentP2, function (err) {
                    if (err) return console.log(err);
                });
                res.render('index.ejs', {
                    session: req.session,
                    idAd: 100,
                    idBotAd: 1,
                    idBot: req.body.idBot,
                    iduser: req.session.idUser,
                    namebot: req.body.name,
                    namebotAd: "Bomber Test",
                    api: urlApi,
                    codeBot: file,
                    codeBotAd: fileP2,
                    avatarBotAd: "bomberman",
                    avatarBot: avatar,
                    type: "test"
                });
            }
        }
        //}


    });



    app.post('/bomberCode', function (req, res) {
        /*if(req.session.type && req.session.type!=""){
         res.redirect("/");
         }else {*/

        if (!req.body.name) {
            res.render('bomberCode.ejs', {
                msgError: "Veuillez saisir un nom pour votre Bomber !",
                msgSuccess: "",
                code: req.body.bomberEditor,
                name: "Mon Bomber",
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session,
                gameFunc: gameFunction
            });
        } else if (!req.body.bomberEditor) {
            res.render('bomberCode.ejs', {
                msgError: "Veuillez saisir un code !",
                msgSuccess: "",
                code: "",
                name: req.body.name,
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session,
                gameFunc: gameFunction
            });
        } else {
            var erreur = "";
            try {
                var F = new Function(player + "\n\r" + req.body.bomberEditor);
                F();
            } catch (e) {
                /*Filtrage des dangers (stope au require)*/


                if (e.name == "ReferenceError") {
                    var stack = e.stack.split("\n");
                    var lignes = stack[1].split(":");
                    var ligne = lignes[4] - 3;
                    erreur = e.name + ": " + e.message + " at ligne " + ligne;
                } else if (e.name == "SyntaxError") {
                    erreur = e.name + ": " + e.message;
                } else {
                    erreur = e.name + ": " + e.message;
                }

                /*Récupération de la ligne si not defined*/
                /* var workerProcess = child_process.exec('node botFiles/test/22.js', function (error, stdout, stderr) {
 
                     if (error) {
                         console.log(error.stack);
                         console.log('Error code: ' + error.code);
                         console.log('Signal received: ' + error.signal);
                     }
                     console.log('stdout: ' + stdout);
                     console.log('stderr: ' + stderr);
                     console.log('err : ' + error);
                 });
 
                 workerProcess.on('exit', function (code) {
                     console.log('Child process exited with exit code ' + code);
                 });*/
            }


            if (erreur != "") {

                res.render('bomberCode.ejs', {
                    msgError: "" + erreur,
                    msgSuccess: "",
                    code: req.body.bomberEditor,
                    name: req.body.name,
                    idBot: req.body.idBot,
                    modeBot: req.body.modeBot,
                    session: req.session,
                    gameFunc: gameFunction
                });
            } else {


                var completePath = "";
                //Création du fichier de test + ouverture
                var dir = "botFiles/" + req.session.login + "/";
                mkdirp(dir, function (err) {
                });
                completePath = dir + "testBot.js";

                //completePath = "./" + myBot.codeBot;

                fs.writeFile(completePath, "var Code = function (){ \n\r this.exec = function() { " + req.body.bomberEditor + " } }", function (err) {
                    if (err) return console.log(err);
                });

                /*Si nouveau bot create sinon update*/

                if (!myBot) {
                    rp({
                        url: urlApi + "/bot",
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: {
                            "nameBot": req.body.name,
                            "codeBot": "",
                            "winBot": 0,
                            "loseBot": 0,
                            "pointBot": 0,
                            "modeBot": req.body.modeBot,
                            "userIdBot": req.session.idUser,
                        }
                    }).then(function (body) {
                        rp({
                            url: urlApi + "/updateBot",
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            json: {
                                "codeBot": "botFiles/" + req.session.login + "/" + body.idBot + ".js",
                                "idBot": body.idBot
                            }
                        }).then(function (body) { }).catch(function (err) { });
                        myBot = body;
                        myBot.codeBot = "botFiles/" + req.session.login + "/" + body.idBot + ".js";
                        fs.rename(completePath, myBot.codeBot);
                        res.render('bomberCode.ejs', {
                            msgError: "",
                            msgSuccess: "Bomber prêt au combat !",
                            code: req.body.bomberEditor,
                            name: req.body.name,
                            idBot: body.idBot,
                            modeBot: req.body.modeBot,
                            session: req.session,
                            gameFunc: gameFunction
                        });
                    }).catch(function (err) {
                        res.render('bomberCode.ejs', {
                            msgError: "Erreur lors de la création du Bomber. Merci de réessayer.",
                            msgSuccess: "",
                            code: req.body.bomberEditor,
                            name: req.body.name,
                            modeBot: req.body.modeBot,
                            idBot: req.body.idBot,
                            session: req.session,
                            gameFunc: gameFunction
                        });
                    });
                } else {
                    myBot.codeBot = "botFiles/" + req.session.login + "/" + myBot.idBot + ".js";
                    fs.writeFile(myBot.codeBot, "var Code = function (){ \n\r this.exec = function() { " + req.body.bomberEditor + " } }", function (err) {
                        if (err) return console.log(err);
                    });
                    rp({
                        url: urlApi + "/updateBot",
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: {
                            "nameBot": req.body.name,
                            "idBot": myBot.idBot,
                            "modeBot": req.body.modeBot
                        }
                    }).then(function (body) { }).catch(function (err) { });

                    res.render('bomberCode.ejs', {
                        msgError: "",
                        msgSuccess: "Bomber prêt au combat !",
                        code: req.body.bomberEditor,
                        name: req.body.name,
                        modeBot: req.body.modeBot,
                        idBot: req.body.idBot,
                        session: req.session,
                        gameFunc: gameFunction
                    });
                }

            }


        }

        //}
    });

    /**/


};