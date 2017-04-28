var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

	app.post("/match", function(req, res, next) {

		if (req.body.resultMatch && req.body.idMapMatch) {
			var date = new Date();
			var Match = models.Match;
			Match.create({
				"resultMatch" : req.body.resultMatch,
				"dateMatch" : date,
				"idMapMatch" : req.body.idTournamentMatch,
				"idTournamentMatch" : 0,
			}).then(function(result){
				res.json({
					"code" : 0,
					"idMatch" : result.idMatch,
					"resultMatch" : result.resultMatch,
					"dateMatch" : result.dateMatch,
					"idMapMatch" : result.idMapMatch,
					"idTournamentMatch" : result.idTournamentMatch,
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
