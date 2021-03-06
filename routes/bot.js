module.exports = function (app, models, utils, urlApi) {
    var rp = require('request-promise');
    app.post("/bot", function (req, res, next) {
        if (req.body.nameBot && req.body.userIdBot) {
            var Bot = models.Bot;
            Bot.create({
                "nameBot": req.body.nameBot,
                "codeBot": req.body.codeBot,
                "avatarBot": "bomberman",
                "winBot": 0,
                "loseBot": 0,
                "pointBot": 0,
                "modeBot": req.body.modeBot,
                "userIdBot": req.body.userIdBot
            }).then(function (result) {
                res.json({
                    "code": 0,
                    "idBot": result.idBot,
                    "nameBot": result.nameBot,
                    "avatarBot": result.avatarBot,
                    "codeBot": result.codeBot,
                    "winBot": result.winBot,
                    "loseBot": result.loseBot,
                    "pointBot": result.pointBot,
                    "modeBot": result.modeBot,
                    "userIdBot": result.userIdBot
                });
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });


    app.get("/bot", function (req, res, next) {
        if (req.body.idBot || req.query.idBot) {
            var Bot = models.Bot;
            var reqIdBot;
            if (req.query.idBot) {
                reqIdBot = req.query.idBot;
            } else {
                reqIdBot = req.body.idBot;
            }
            var request = {
                where: {
                    idBot: reqIdBot
                }
            };
            Bot.find(request).then(function (result) {
                if (result) {
                    res.json({
                        "code": 0,
                        "idBot": result.idBot,
                        "nameBot": result.nameBot,
                        "avatarBot": result.avatarBot,
                        "codeBot": result.codeBot,
                        "winBot": result.winBot,
                        "loseBot": result.winBot,
                        "modeBot": result.modeBot,
                        "userIdBot": result.userIdBot
                    });
                } else {
                    res.json({
                        "code": 3,
                        "message": "Bot not found"
                    });
                }
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });

    app.get("/botByUser", function (req, res, next) {
        if (req.body.userIdBot) {
            var Bot = models.Bot;
            var request = {
                where: {
                    userIdBot: req.body.userIdBot
                }
            };
            Bot.findAll(request).then(function (results) {
                res.send(results);
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });


    app.get("/ListBot", function (req, res, next) {
        var Bot = models.Bot;
        Bot.findAll().then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.get("/topBots", function (req, res, next) {
        var Bot = models.Bot;

        Bot.sequelize.query("SELECT b.*, u.loginUser FROM bot AS b, user AS u WHERE b.userIdBot = u.idUser ORDER BY pointBot DESC LIMIT 3")
            .then(function (results) {
                res.send(results);
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
    });

    app.get("/historyBot", function (req, res, next) {
        var Bot = models.Bot;
    
        Bot.sequelize.query("SELECT Distinct(m.idMatch), b1.nameBot as nameBot1, b2.nameBot as nameBot2, u1.loginUser as loginUser1, u2.loginUser as loginUser2, m.idWinner, m.idLoose, m.dateMatch, m.matchNull FROM bot AS b1, bot AS b2, user AS u1, user AS u2, matchBot as m WHERE b1.idBot = m.idWinner AND b1.userIdBot = u1.idUser AND b2.idBot = m.idLoose AND b2.userIdBot = u2.idUser AND(m.idWinner = " + req.body.idBot + " OR m.idLoose = " + req.body.idBot + ") ORDER BY m.dateMatch")
            .then(function (results) {
                res.send(results);
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
    });

    /**app.get("/topBots", function (req, res, next) {
        var Bot = models.Bot;
        Bot.findAll({
            order: '`pointBot` DESC',
            limit: 3
        }).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            })
        })
    });*/

    /**app.get("/classementBot", function (req, res, next) {
        var Bot = models.Bot;
        Bot.findAll({
            order: '`pointBot` DESC',
            limit: 2
        }).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            })
        })
    });*/

    app.get("/classementBot/:limit/:page", function (req, res, next) {
        var Bot = models.Bot;
        var reqLimit = req.params.limit;
        var offset = 0;

        Bot.findAndCountAll().then(function (data) {
            var page = req.params.page;
            var nbPages = Math.ceil(data.count / reqLimit);
            offset = reqLimit * (page - 1);
            Bot.sequelize.query("SELECT b.*, u.loginUser FROM bot AS b, user AS u WHERE b.userIdBot = u.idUser ORDER BY pointBot DESC LIMIT " + reqLimit + " OFFSET " + offset)
                .then(function (results) {
                    res.json({
                        "code": 0,
                        "result": results,
                        "count": data.count,
                        "limit": reqLimit,
                        "pages": nbPages
                    });
                });
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.get("/updateBot/:id", function (req, res, next) {
        var Bot = models.Bot;
        var request = {
            "where": {
                idBot: req.params.id
            }
        };

        Bot.find(request).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.post("/updateBot", function (req, res, next) {
        var request = {
            "where": {
                idBot: req.body.idBot
            }
        };

        var attributes = {};
        if (req.body.nameBot) {
            attributes.nameBot = req.body.nameBot;
        }
        if (req.body.codeBot) {
            attributes.codeBot = req.body.codeBot;
        }
        if (req.body.winBot) {
            attributes.winBot = req.body.winBot;
        }
        if (req.body.loseBot) {
            attributes.loseBot = req.body.loseBot;
        }
        if (req.body.pointBot) {
            attributes.pointBot = req.body.pointBot;
        }
        if (req.body.modeBot) {
            attributes.modeBot = req.body.modeBot;
        }
        if (req.body.avatarBot) {
            attributes.avatarBot = req.body.avatarBot;
        }

        var u1 = models.Bot;
        u1.update(attributes, request).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });

    });


    app.post('/adversaire', function (req, res) {
        if (!req.session.type) {
            res.redirect("/");
        } else {

            var Bot = utils.Bot;
            var u1 = new Bot();
            u1.findEnemy(req.body.idbot, req.body.iduser, function (result) {
                res.send(result);
            });


	        }
	  });
    app.post('/left', function(req, res) {

		         var Bot = utils.Bot;
						 var u1 = new Bot();
             var current = new Date();

              u1.loose(req.body.idLoose,function(result){
               res.send(result);
             });


	  });
		app.post('/win', function(req, res) {

        var Bot = utils.Bot;
        var u1 = new Bot();
        var current = new Date();
        if (req.body.null == "true") {
            rp({
                url: urlApi + "/match",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: {
                    "matchNull": true,
                    "idWinner": req.body.idBot,
                    "idLoose": req.body.idLoose,
                    "dateMatch": current.getDate(),
                    "idMapMatch": null,
                    "idTournamentMatch": null
                }
            }).then(function (body) {
                res.redirect("/");
            });

        } else {

               rp({
                   url: urlApi + "/match",
                   method: "POST",
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   json: {
                       "matchNull": false,
                       "idWinner": req.body.idBot,
                       "idLoose": req.body.idLoose,
                       "dateMatch" : current.getDate(),
                       "idMapMatch": null,
                       "idTournamentMatch":null
                   }
               }).then(function(body){
                 console.log(body);
               });
               u1.win(req.body.idBot,function(result){

              });
              u1.loose(req.body.idLoose,function(result){
               console.log(result);
              res.redirect("/");
            });
             }

    });


};
