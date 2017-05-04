module.exports = function(app, models, utils, urlApi) {

	require("./user")(app, models, utils);
	require("./map")(app, models, utils);
	require("./succes")(app, models, utils);
	require("./match")(app, models, utils);
	require("./bot")(app, models, utils);
	require("./tournament")(app, models, utils);
	require("./home")(app, models);
	require("./login")(app, models, urlApi);
	require("./logout")(app);


}
