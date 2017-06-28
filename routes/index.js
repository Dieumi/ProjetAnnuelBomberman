module.exports = function(app, models, utils, urlApi) {

	//API
	require("./user")(app, models, utils);
	require("./map")(app, models);
	require("./succes")(app, models);
	require("./match")(app, models);
	require("./bot")(app, models);
	require("./tournament")(app, models);

	//FRONT
	require("./home")(app, urlApi);
	require("./classement")(app, urlApi);
	require("./profile")(app, urlApi);
	require("./login")(app, models, urlApi);
    require("./signup")(app, models, urlApi);
	require("./logout")(app);
    require("./myBomberman")(app, models, urlApi);
    require("./bomberCode")(app, models, urlApi);

}
