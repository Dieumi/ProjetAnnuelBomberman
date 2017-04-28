var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

	app.post("/map", function(req, res, next) {

		if (req.body.nameMap) {
			var Map = models.Map;
			Map.create({
				"nameMap" : req.body.nameMap,
			}).then(function(result){
				res.json({
					"code" : 0,
					"idMap" : result.idMap,
					"nameMap" : result.nameMap,
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

	app.get("/ListMap", function (req, res, next) {
		var map = models.Map;
		map.findAll().then(function (results) {
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
