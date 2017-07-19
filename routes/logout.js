module.exports = function(app){

 
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	
	app.get('/logout', function(req, res, next) {
		req.session.destroy();
		res.redirect("/");
	});


};