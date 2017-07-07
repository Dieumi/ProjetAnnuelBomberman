var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models,utils) {

	app.post("/bot", function(req, res, next) {
		if (req.body.nameBot && req.body.userIdBot) {
			var Bot = models.Bot;
			Bot.create({
				"nameBot" : req.body.nameBot,
				"codeBot": req.body.codeBot,
				"winBot" : 0,
				"loseBot" : 0,
				"pointBot" : 0,
				"modeBot" : "peaceful",
				"userIdBot" : req.body.userIdBot,
			}).then(function(result){
				res.json({
					"code" : 0,
					"idBot" : result.idBot,
					"nameBot" : result.nameBot,
					"codeBot" : result.codeBot,
					"winBot" : result.winBot,
					"loseBot" : result.loseBot,
					"pointBot" : result.pointBot,
					"modeBot" : result.modeBot,
					"userIdBot" : result.userIdBot,
				});
			}).catch(function(err){
				res.json({
					"code" : 2,
					"message" : "Sequelize error"
				})
			});
		} else {
			res.json({
				"code" : 1,
				"message" : "Missing required parameters"
			})
		}
	});

    app.get("/bot", function (req, res, next) {
        console.log(req.query.idBot)
        if(req.body.idBot || req.query.idBot){
            var Bot = models.Bot;
            var idBot;
            if (req.query.idBot) {
                idBot = req.query.idBot
            } else {
                idBot = req.body.idBot
            }
			var request = {
				where: {
                    idBot : idBot
				}
			}
			Bot.find(request).then(function (result) {
				if(result){
					res.json({
						"code"      : 0,
						"idBot"     : result.idBot,
						"nameBot"   : result.nameBot,
						"codeBot"   : result.codeBot,
						"winBot"    : result.winBot,
						"loseBot"   : result.winBot,
						"modeBot"   : result.modeBot,
						"userIdBot" : result.userIdBot
					});
				}else{
					res.json({
						"code" : 3,
						"message" : "Bot not found"
					})
				}
			}).catch(function (err) {
				res.json({
					"code": 2,
					"message": "Sequelize error",
					"error": err
				})
			})
        }else{
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            })
        }
    });

    app.get("/botByUser", function (req, res, next) {
        if(req.body.userIdBot){
            var Bot = models.Bot;
            var request = {
                where: {
                    userIdBot : req.body.userIdBot
                }
            }
            Bot.findAll(request).then(function (results) {
                res.send(results)
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })
        }else{
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            })
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
			})
		})
	});

	app.get("/topBots", function (req, res, next) {
        var Bot = models.Bot;
        var User = models.User;

        Bot.sequelize.query("SELECT b.*, u.loginUser FROM bot AS b, user AS u WHERE b.userIdBot = u.idUser ORDER BY pointBot DESC LIMIT 3")
        .then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            })
        })
    })

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
            var User = models.User;
            var limit = req.params.limit;
            var offset = 0;
            Bot.findAndCountAll()
            .then(function(data) {
                var page = req.params.page;
                var pages = Math.ceil(data.count / limit);
                offset = limit * (page - 1);
                Bot.sequelize.query("SELECT b.*, u.loginUser FROM bot AS b, user AS u WHERE b.userIdBot = u.idUser ORDER BY pointBot DESC LIMIT " + limit + " OFFSET " + offset)
                .then(function (results) {
                    res.json({
                        'code': 0,
                        'result': results,
                        'count': data.count,
                        'limit': limit,
                        'pages': pages
                    });
                })
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })
        })

	app.get("/updateBot/:id", function (req, res, next) {

            var Bot = models.Bot;

            var request = {
                "where": {
                    idBot: req.params.id
                }
            }
            Bot.find(request).then(function (results) {

                res.send(results)
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })

    });

    app.post("/updateBot", function (req, res, next) {
        var Bot = models.Bot;
        var request = {
            "where": {
                idBot: req.body.idBot
            }
        }

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

        var u1 = models.Bot;
        u1.update(attributes, request, function (err, data) {
            res.send("/ListeBot");
        });


    });

	  app.post('/adversaire', function(req, res) {
	        if(!req.session.type){
	            res.redirect("/");
	        }else {

	         var Bot = utils.Bot;
					 console.log(Bot);
					 var u1 = new Bot()
					 u1.findEnemy(req.body.idbot,req.body.iduser,function(result){
		
						 res.send(result)
					 })


	        }
	  });
}
