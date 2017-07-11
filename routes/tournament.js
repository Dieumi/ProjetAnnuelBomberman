var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

	app.post("/tournament", function(req, res, next) {

		if (req.body.nameTournament && req.body.nbPlayerTournament
			&& req.body.pointMiniTournament && req.body.createdByTournament) {
			var Tournament = models.Tournament;
			Tournament.create({
				"nameTournament" : req.body.nameTournament,
				"nbPlayerTournament" : req.body.nbPlayerTournament,
				"pointMiniTournament" : req.body.pointMiniTournament,
				"createdByTournament" : req.body.createdByTournament
			}).then(function(result){
				res.json({
					"code" : 0,
					"idTournament" : result.idTournament,
					"nameTournament" : result.nameTournament,
					"nbPlayerTournament" : result.nbPlayerTournament,
					"winBot" : result.pointMiniTournament,
					"createdByTournament" : result.createdByTournament
				});
			}).catch(function(err){
				res.json({
					"code" : 2,
					"message" : "Sequelize error",
					"error" : err
				});
			});
		} else {
			res.json({
				"code" : 1,
				"message" : "Missing required parameters"
			})
		}
	});

	app.get("/ListTournament", function (req, res, next) {
		var tournament = models.Tournament;
        tournament.findAll().then(function (results) {
			res.send(results);
		}).catch(function (err) {
			res.json({
				"code": 2,
				"message": "Sequelize error",
				"error": err
			})
		})
	});
};
