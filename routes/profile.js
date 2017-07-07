module.exports = function(app, urlApi){
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	var rp = require('request-promise')

	app.get('/profile/:id', function(req, res) {
		rp({
			url: urlApi + "/user/profile/" + req.params.id,
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(body) {
		console.log(body)
			res.render('profile.ejs', {
				session : req.session,
				profile : body
			});
		})
	});
}