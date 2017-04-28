module.exports = function(app, models) {
	
	require("./user")(app, models, utils);
	require("./home")(app, models);
	require("./login")(app, models);
	require("./logout")(app);
	

}
