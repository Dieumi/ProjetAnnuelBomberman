var express = require("express");
var bodyParser = require("body-parser");
var models = require("./models");

var app = express();
app.use(bodyParser.json());

require("./routes")(app, models)

app.listen(8888, function() {
	console.log("Server started port 8888...");
});