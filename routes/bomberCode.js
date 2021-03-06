module.exports = function (app, models, urlApi) {

    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var rp = require('request-promise');
    var api = models.myApi;
    var request = require('request');

    var players = "function Player(t,i,n){this.context=t,this.name=i||\"Whale\",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){},this.isObstacle = function (x, y){},this.isWall = function (x, y) { }, this.isEmpty = function (x, y) { }, this.isBomb = function (x, y) { }, this.isBomber = function(x, y){} };var player = new Player(null, \"test\", null);";
    var gameFunction = "";
   
    app.get('/bomberCode/:idBot?', function (req, res, next) {
       
        
        if(!req.session.type){
            res.redirect("/");
        }else {

            rp({
                url: urlApi + "/gameApiDesc",
                method: "GET"
            }).then(function (body) {
                gameFunction = JSON.parse(body);
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

                                var allCode = fs.readFileSync("./" + body.codeBot, "UTF-8");
                                // on retire la def des fonctions
                                var code = "";
                                if (allCode != "") {
                                    allCode = allCode.replace("var Code = function (){\n\rthis.exec = function() {", "");
                                    allCode = allCode.replace(/var stopInfiniteLoop[0-9]+=0;/g, "");
                                    code = allCode.replace(/if\(stopInfiniteLoop[0-9]+>100\){console.log\(\"boucle infini\"\);return null;}stopInfiniteLoop[0-9]+\+\+;/g, "");
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
                                    gameFunc: gameFunction,
                                    avatarBot: body.avatarBot
                                });
                                return null;
                            }
                        }
                    }).catch(function (err) {
                        console.log(err);
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
                        gameFunc: gameFunction,
                        avatarBot: "bomberman"
                    });
                }
                return null;
            }).catch(function (err) {
                res.redirect('/myBomberman');
            });
        }
    });

    app.post('/bomberCode/testInGame', function (req, res, next) {
        if(!req.session.type){
            res.redirect("/");
         }else {
        
        if (!req.body.name) {
            res.render('bomberCode.ejs', {
                msgError: "Veuillez saisir un nom pour votre Bomber !",
                msgSuccess: "",
                code: req.body.bomberEditor,
                name: "Mon Bomber",
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session,
                gameFunc: gameFunction,
                avatarBot: req.body.avatarBot
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
                gameFunc: gameFunction,
                avatarBot: req.body.avatarBot
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
                avatarBot: req.body.avatarBot,
                type: "test"
            });
            
        }
        }


    });



    app.post('/bomberCode', function (req, res, next) {
        if(!req.session.type){
         res.redirect("/");
         }else {
        if (!req.body.name) {
            res.render('bomberCode.ejs', {
                msgError: "Veuillez saisir un nom pour votre Bomber !",
                msgSuccess: "",
                code: req.body.bomberEditor,
                name: "Mon Bomber",
                idBot: req.body.idBot,
                modeBot: req.body.modeBot,
                session: req.session,
                gameFunc: gameFunction,
                avatarBot: req.body.avatarBot
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
                gameFunc: gameFunction,
                avatarBot: req.body.avatarBot
            });
        } else {

            var completePath = "";
            //Création du fichier de test + ouverture
            var dir = "botFiles/" + req.session.login + "/";
            mkdirp(dir, function (err) {
            });
            completePath = dir + "testBot.js";

            var theCode = req.body.bomberEditor;
            var tmpCode = "";
            var indiceSup = 0;
            var debutBoucle;
            var indices = [];
            var checkBefore = "";
            var checkAfter = "";
            var regexForWhile = new RegExp("[a-z0-9]");
            var nbLoop = 1;
            var nextChar = 0;
            var nextChar2 = 0;
            var charToAdd = 0;
            /*On met dans les boucles la sécu pour stopper boucle infini*/
            /*On cherche toutes les boucles for */
            indices = getIndicesOf("for", theCode);
            var nbFor = 0; 
            for (var i = 0; i < indices.length; i++) {
               
                if (nbFor > 0) {
                    indiceSup = indiceSup + 113 + charToAdd;
                    
                }

                tmpCode = "";
                tmpCode = theCode.substring(indices[i] + indiceSup, theCode.length);
                checkBefore = theCode.substring(indices[i] + indiceSup - 1, indices[i] + indiceSup);
                
                nextChar = 3;

                while (tmpCode[nextChar] == " ") {
                    nextChar++;
                }

                if (charToAdd == 2) {
                    console.log(nbLoop);
                    console.log(tmpCode[nextChar] + tmpCode[nextChar + 1] + tmpCode[nextChar + 2]);
                }
                if (regexForWhile.test(checkBefore) === false && tmpCode[nextChar] == "(") {
                    nbFor++;
                    debutBoucle = tmpCode.indexOf("{");
                    tmpCode = theCode.substring(0, indices[i] + indiceSup) + "var stopInfiniteLoop" + nbLoop + "=0;" + theCode.substring(indices[i] + indiceSup, indices[i] + indiceSup + debutBoucle + 1) + "if(stopInfiniteLoop" + nbLoop + ">100){console.log(\"boucle infini\");return null;}stopInfiniteLoop" + nbLoop + "++;" + theCode.substring(indices[i] + indiceSup + debutBoucle + 1, theCode.length);
                    theCode = tmpCode;
                    
                    if (nbLoop.toString()[0] == 1 && nbLoop % 10 == 0) {
                        charToAdd = charToAdd +3;
                    }
                    nbLoop++;
                   
                }
            }
            indiceSup = 0;
            /*Tous les while*/
            indices = getIndicesOf("while", theCode);
            var nbWhile = 0;
            for (var j = 0; j < indices.length; j++) {
                if (nbWhile > 0) {
                    indiceSup = indiceSup + 113 + charToAdd;
                }

                tmpCode = "";
                tmpCode = theCode.substring(indices[j] + indiceSup, theCode.length);

                /*test Si ce n'est pas un do while*/
                nextChar = tmpCode.indexOf(")") + 1;

                while (tmpCode[nextChar] == " ") {
                    nextChar++;
                }
                checkBefore = theCode.substring(indices[j] + indiceSup - 1, indices[j] + indiceSup);

                nextChar2 = 5;

                while (tmpCode[nextChar2] == " ") {
                    nextChar2++;
                }
               

             
                if (tmpCode[nextChar] != ";" && regexForWhile.test(checkBefore) === false && tmpCode[nextChar2] =="(") {

                    nbWhile++;
                    debutBoucle = tmpCode.indexOf("{");
                    tmpCode = theCode.substring(0, indices[j] + indiceSup) + "var stopInfiniteLoop" + nbLoop + "=0;" + theCode.substring(indices[j] + indiceSup, indices[j] + indiceSup + debutBoucle + 1) + "if(stopInfiniteLoop" + nbLoop + ">100){console.log(\"boucle infini\");return null;}stopInfiniteLoop" + nbLoop + "++;" + theCode.substring(indices[j] + indiceSup + debutBoucle + 1, theCode.length);
                    theCode = tmpCode;
                    if (nbLoop.toString()[0] == 1 && nbLoop % 10 == 0) {
                        charToAdd = charToAdd + 3;
                    }
                    nbLoop++;


                    
                }
               
                
            }

            /*tous les do while*/
            indices = getIndicesOf("do", theCode);
            var nbDoWhile = 0;
            indiceSup = 0;
            for (var y = 0; y < indices.length; y++) {
                
                if (nbDoWhile > 0) {
                    indiceSup = indiceSup + 113 + charToAdd;
                }

                tmpCode = "";
                tmpCode = theCode.substring(indices[y] + indiceSup, theCode.length);
                /*test si c'est réelement un doWhile et non un mot contenant do*/
                var nextCharDoWhile = 2;
                while (tmpCode[nextCharDoWhile] == " ") {
                    nextCharDoWhile++;
                }
                if (tmpCode[nextCharDoWhile] == "{") {
                    nbDoWhile++;
                    debutBoucle = tmpCode.indexOf("{");
                    tmpCode = theCode.substring(0, indices[y] + indiceSup) + "var stopInfiniteLoop" + nbLoop + "=0;" + theCode.substring(indices[y] + indiceSup, indices[y] + indiceSup + debutBoucle + 1) + "if(stopInfiniteLoop" + nbLoop + ">100){console.log(\"boucle infini\");return null;}stopInfiniteLoop" + nbLoop + "++;" + theCode.substring(indices[y] + indiceSup + debutBoucle + 1, theCode.length);
                    theCode = tmpCode;
                    if (nbLoop.toString()[0] == 1 && nbLoop % 10 == 0) {
                        charToAdd = charToAdd + 3;
                    }
                    nbLoop++;
                   

                }
            }



            fs.writeFile(completePath, "var Code = function (){\n\rthis.exec = function() {" + theCode + " } }", function (err) {
                if (err) return console.log(err);
            });

            /*Si nouveau bot create sinon update*/

            if (!req.body.idBot) {
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
                        "userIdBot": req.body.idUser,
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
                    }).then(function (body) {
                        return null;
                    }).catch(function (err) { 
                        console.log(err);
                    });
                   

                    var codeBot = "botFiles/" + req.session.login + "/" + body.idBot + ".js";
                    fs.rename(completePath, codeBot);
                    res.render('bomberCode.ejs', {
                        msgError: "",
                        msgSuccess: "Bomber prêt au combat !",
                        code: req.body.bomberEditor,
                        name: req.body.name,
                        idBot: body.idBot,
                        modeBot: req.body.modeBot,
                        session: req.session,
                        gameFunc: gameFunction,
                        avatarBot: req.body.avatarBot
                    });
                    return null;
                }).catch(function (err) {
                    res.render('bomberCode.ejs', {
                        msgError: "Erreur lors de la création du Bomber. Merci de réessayer.",
                        msgSuccess: "",
                        code: req.body.bomberEditor,
                        name: req.body.name,
                        modeBot: req.body.modeBot,
                        idBot: req.body.idBot,
                        session: req.session,
                        gameFunc: gameFunction,
                        avatarBot: req.body.avatarBot
                    });
                });
            } else {
                var codeBot = "botFiles/" + req.session.login + "/" + req.body.idBot + ".js";
                fs.writeFile(codeBot, "var Code = function (){\n\rthis.exec = function() {" + theCode + " } }", function (err) {
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
                        "idBot": req.body.idBot,
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
                    gameFunc: gameFunction,
                    avatarBot: req.body.avatarBot
                });
            }

            


        }

        }
    });


    function getIndicesOf(searchStr, str) {
        var searchStrLen = searchStr.length;
        var startIndex = 0, index, indices = [];
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }

        return indices;
    }
    /**/


};