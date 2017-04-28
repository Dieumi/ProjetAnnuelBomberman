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

	app.get("/ListMatch", function (req, res, next) {
		var match = models.Match;
		match.findAll().then(function (results) {
			res.send(results);
		}).catch(function (err) {
			res.json({
				"code": 2,
				"message": "Sequelize error",
				"error": err
			})
		})
	});
}
