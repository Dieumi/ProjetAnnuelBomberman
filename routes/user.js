var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models,utils) {

	app.post("/user", function(req, res, next) {

		if (req.body.loginUser
				&& req.body.emailUser && req.body.passwordUser) {
			var User = models.User;
			User.create({
				"loginUser" : req.body.loginUser,
				"emailUser" : req.body.emailUser,
				"passwordUser" : bcrypt.hashSync(req.body.passwordUser, null, null),
				"typeUser" : "user",

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
	app.get("/ListeUser", function (req, res, next) {
			var user = models.User;


					user.findAll().then(function (results) {
							res.send(results);
					}).catch(function (err) {

							res.json({
									"code": 2,
									"message": "Sequelize error",
									"error": err
							})
					})


	});


    app.delete("/deleteuser/:id", function (req, res, next) {
        var user = utils.user;
        var u1 = new user();
        if (req.params.id) {
            u1.delete(req.params.id, function (result) {
              res.status(200);
              res.json({
                "user":"deleted"
              })
                res.send(result);
            })
        }
    });
}
