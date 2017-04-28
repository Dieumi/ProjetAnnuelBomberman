module.exports = function(app){
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('home.ejs', {session : req.session}); // load the home.ejs file
	});
}