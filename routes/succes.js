var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

	app.post("/succes", function(req, res, next) {

		if (req.body.nameSucces) {
			var Succes = models.Succes;
			Succes.create({
				"nameSucces" : req.body.nameSucces,
				"imgSucces" : req.body.imgSucces
			}).then(function(result){
				res.json({
					"code" : 0,
					"idSucces" : result.idSucces,
					"nameSucces" : result.nameSucces,
					"imgSucces" : result.imgSucces
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
			});
		}
	});

	app.get("/ListSucces", function (req, res, next) {
		var succes = models.Succes;
		succes.findAll().then(function (results) {
			res.send(results);
		}).catch(function (err) {
			res.json({
				"code": 2,
				"message": "Sequelize error",
				"error": err
			});
		})
	});
};
