module.exports = function(app, models, utils, urlApi) {
	
	require("./user")(app, models, utils);
	require("./map")(app, models);
	require("./succes")(app, models);
	require("./match")(app, models);
	require("./bot")(app, models);
	require("./tournament")(app, models);
	require("./home")(app, models);
	require("./login")(app, models, urlApi);
	require("./logout")(app);
	

}
