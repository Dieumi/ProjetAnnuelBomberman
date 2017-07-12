var seq = require("./sequelize");
var UserModel = require("./User");
var MapModel = require("./Map");
var BotModel = require("./Bot");
var MatchModel = require("./Match");
var SuccesModel = require("./Succes");
var TournamentModel = require("./Tournament");
var PostModel = require("./Post");
var GameApiDesc = require("./GameApiDesc");

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
    "Post" : PostModel,
    "Bomb" : bombModel,
    "Player" : playerModel,
    "GameApiDesc": GameApiDesc
};
