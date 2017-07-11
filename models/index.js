var seq = require("./sequelize");
var UserModel = require("./User");
var MapModel = require("./Map");
var BotModel = require("./Bot");
var MatchModel = require("./Match");
var SuccesModel = require("./Succes");
var TournamentModel = require("./Tournament");

seq.sync();

var bombModel = require("./Bomb");
var playerModel = require("./Player");

module.exports = {
    "sequelize" : seq,
    "User" : UserModel,
    "Map" : MapModel,
    "Bot" : BotModel,
    "Match" : MatchModel,
    "Succes" : SuccesModel,
    "Tournament" : TournamentModel,
    "Bomb" : bombModel,
    "Player" : playerModel
};
