module.exports = function(app, urlApi){
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	var rp = require('request-promise')

	app.get('/', function(req, res) {
		rp({
			url: urlApi + "/topBots",
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(body) {
			res.render('home.ejs', {
				session : req.session,
				top : body
			});
		})
	});
}
