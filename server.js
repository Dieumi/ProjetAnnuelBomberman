var express  = require('express');
var bodyParser = require('body-parser');
var app      = express();
var models = require("./models");
var utils = require("./utils");
var cookieParser = require('cookie-parser');
var session  = require('express-session');
var urlApi = "http://localhost:8888"

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

/*Dossier fichier pour les bot*/
app.use(express.static(__dirname + '/botFiles'));


app.set('view engine', 'ejs'); // set up ejs for templating

require("./routes")(app, models, utils, urlApi)

app.listen(8888, function() {
	console.log("Server started port 8888...");
});
