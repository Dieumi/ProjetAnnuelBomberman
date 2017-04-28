var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {
	
	app.post("/user", function(req, res, next) {
		
		if (req.body.loginUser
				&& req.body.emailUser && req.body.passwordUser && req.body.typeUser) {
			var User = models.User;
			User.create({
				"loginUser" : req.body.loginUser,
				"emailUser" : req.body.emailUser,
				"passwordUser" : bcrypt.hashSync(req.body.passwordUser, null, null),
				"typeUser" : req.body.typeUser,
				
			}).then(function(result){
				res.json({
					"code" : 0,
					"idUser" : result.idUser,
					"loginUser" : result.loginUser,
					"emailUser" : result.emailUser,
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
}