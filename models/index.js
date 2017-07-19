var seq = require("./sequelize");
var UserModel = require("./User");
var BotModel = require("./Bot");
var MatchModel = require("./Match");
var PostModel = require("./Post");
var GameApiDesc = require("./GameApiDesc");
var AvatarBot = require("./AvatarBot");

seq.sync();

var bombModel = require("./Bomb");
var playerModel = require("./Player");


module.exports = {
    "sequelize" : seq,
    "User" : UserModel,
    "Bot" : BotModel,
    "Match" : MatchModel,
    "Post" : PostModel,
    "Bomb" : bombModel,
    "Player" : playerModel,
    "GameApiDesc": GameApiDesc,
    "AvatarBot": AvatarBot
};
