var express  = require('express');
var bodyParser = require('body-parser');
var app      = express();
var models = require("./models");
var utils = require("./utils");
var cookieParser = require('cookie-parser');
var session  = require('express-session');

var urlApi = "http://bomberbot1dev.herokuapp.com"
//var urlApi = "http://localhost:8888"


var socket = require("socket.io");
module.exports = app;

app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
} ));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(__dirname + '/ressources'));

app.set('view engine', 'ejs'); // set up ejs for templating

/*Dossier fichier pour les bot*/
app.use(express.static(__dirname + '/botFiles'));

app.set('view engine', 'ejs'); // set up ejs for templating

require("./routes")(app, models, utils, urlApi)

var port=process.env.PORT || 8888;
var server=app.listen(port, function() {
	console.log("Server started port 8888...");
});


//require("./gamesServer")(app,models,utils, urlApi,server);
