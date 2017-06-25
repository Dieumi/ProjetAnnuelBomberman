var sequelize = require("./sequelize");
var User = require("./User");
var Map = require("./Map");
var Bot = require("./Bot");
var Match = require("./Match");
var Succes = require("./Succes");
var Tournament = require("./Tournament");

sequelize.sync();
var bomb=require("./Bomb");
var player=require("./Player");
module.exports = {
	"sequelize" : sequelize,
	"User" : User,
	"Map" : Map,
	"Bot" : Bot,
	"Match" : Match,
	"Succes" : Succes,
	"Tournament" : Tournament,
	"Bomb":bomb,
	"Player": player
};
