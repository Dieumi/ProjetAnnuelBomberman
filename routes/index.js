module.exports = function(app, models, utils, urlApi) {

	//API
	require("./user")(app, models, utils);
	require("./map")(app, models);
	require("./succes")(app, models);
	require("./match")(app, models);
	require("./bot")(app, models,utils,urlApi);
	require("./tournament")(app, models);
	require("./gameApiDesc")(app, models, utils);
	require("./post")(app, models);
	require("./avatarBot")(app, models);

	//FRONT
	require("./home")(app, urlApi);
	require("./classement")(app, urlApi);
	require("./history")(app, urlApi);
	require("./news")(app, urlApi);
	require("./profile")(app, urlApi);
	require("./login")(app, models, urlApi);
	require("./news")(app, urlApi);
    require("./signup")(app, models, urlApi);
	require("./logout")(app);
    require("./myBomberman")(app, models, urlApi);
    require("./bomberCode")(app, models, urlApi);
    require("./bomberGame")(app, models, urlApi);
};