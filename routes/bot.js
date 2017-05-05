var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

	app.post("/bot", function(req, res, next) {

		if (req.body.nameBot && req.body.userIdBot) {
			var Bot = models.Bot;
			Bot.create({
				"nameBot" : req.body.nameBot,
				"codeBot" : "print('coucou');",
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
        var Bot = utils.Bot;
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
			

        var u1 = new Bot();
        u1.update(request, attributes, function (err, data) {
            res.send("/ListeBot");
        });


    });
}
