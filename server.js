var express = require("express");
var bodyParser = require("body-parser");
var models = require("./models");
var utils = require("./utils");
var app = express();
app.use(bodyParser.json());

require("./routes")(app, models,utils)

app.listen(8888, function() {
	console.log("Server started port 8888...");
});
