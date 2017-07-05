module.exports = function(app, urlApi){
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    var rp = require('request-promise')

    app.get('/', function(req, res) {
		rp({
			url: urlApi + "/classementBot/3/1",
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(body) {
		var topBots = body
		    rp({
		        url: urlApi + "/user/count",
                method: "GET",
                headers: {
                	'Content-Type': 'application/json'
                }
            }).then(function(body) {
                res.render('home.ejs', {
                    session : req.session,
                    userCount : body,
                    top : topBots
                });
            })
		})
	});
}
