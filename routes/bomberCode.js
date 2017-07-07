module.exports = function(app, models, urlApi){

    var child_process = require('child_process');
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var rp = require('request-promise')
    var api = models.myApi;
    var request = require('request');
    var myBot;
    var player = "function Player(t,i,n){this.context=t,this.name=i||\"Whale\",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){}};var player = new Player(null, \"test\", null);"

    app.get('/bomberCode/:idBot?', function(req, res) {
        myBot=null;
        /*if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {*/
            if(req.params.idBot){
                rp({
                    url: urlApi+"/bot",
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
                                code:body.codeBot,
                                name: body.nameBot,
                                mode : body.modeBot,
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
                    mode: "aggro",
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
                    mode: req.body.modeBot,
                    idBot : req.body.idBot,
                    session: req.session
                });
            } else if (!req.body.bomberEditor) {
                res.render('bomberCode.ejs', {
                    msgError: "Veuillez saisir un code !",
                    msgSuccess: "",
                    code: "",
                    name: req.body.name,
                    mode: req.body.modeBot,
                    idBot : req.body.idBot,
                    session: req.session
                });
            } else {

                var checkCode = "";
                try {
                    
                    var myObject = eval(player+"\n\r"+req.body.bomberEditor);
                } catch (error) {
                    var errorType = error.split(":");
                    var tSplit = req.body.bomberEditor.split("\n")
                    for (var i = 0; i < sizeOf(tSplit) ; i++) {

                    }
                    checkCode = error;
                }
                console.log("checkcode : " + checkCode)

                if (checkCode!="") {
                   
                    res.render('bomberCode.ejs', {
                        msgError: ""+checkCode,
                        msgSuccess: "",
                        code: req.body.bomberEditor,
                        mode: req.body.modeBot,
                        name: req.body.name,
                        idBot : req.body.idBot,
                        session: req.session
                    });
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
                                "codeBot": req.body.bomberEditor,
                                "winBot": 0,
                                "loseBot": 0,
                                "pointBot": 0,
                                "modeBot": "aggro",
                                "userIdBot": req.session.idUser,
                            }
                        }).then(function (body) {
                            myBot = body
                            myBot.codeBot = req.body.bomberEditor
                            res.render('bomberCode.ejs', {
                                msgError: "",
                                msgSuccess: "Bomber prêt au combat !",
                                code: req.body.bomberEditor,
                                name: req.body.name,
                                mode: req.body.modeBot,
                                idBot: body.idBot,
                                session: req.session
                            });
                        }).catch(function (err) {
                            res.render('bomberCode.ejs', {
                                msgError: "Erreur lors de la création du Bomber. Merci de réessayer.",
                                msgSuccess: "",
                                code: req.body.bomberEditor,
                                name: req.body.name,
                                mode: req.body.modeBot,
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
                                "idBot": myBot.idBot,
                                "codeBot": req.body.bomberEditor,
                                "modeBot": req.body.modeBot,
                            }
                        }).then(function(body){}).catch(function (err) {})

                        res.render('bomberCode.ejs', {
                            msgError: "",
                            msgSuccess: "Bomber prêt au combat !",
                            code: req.body.bomberEditor,
                            name: req.body.name,
                            mode: req.body.modeBot,
                            idBot: req.body.idBot,
                            session: req.session
                        });
                    }

                }

                
            }

        //}
    });

    /**/
 

}