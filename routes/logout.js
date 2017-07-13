module.exports = function(app){

	// =====================================
	// Logout ==============================
	// =====================================

	app.get("/logout", function(req, res, next) {
		req.session.destroy();
		res.redirect("/");
	});
};