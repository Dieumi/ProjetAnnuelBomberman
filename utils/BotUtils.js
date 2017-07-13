var models=require("../models");
var Sequelize = require("sequelize");

var BotUtils=function(id,nameBot,codeBot,winBot,loseBot,pointBot,modeBot,userIdBot){
    this.idBot=id;
    this.nameBot=nameBot;
    this.codeBot=codeBot;
    this.winBot=winBot;
    this.loseBot=loseBot;
    this.pointBot=pointBot;
    this.modeBot=modeBot;
    this.userIdBot=userIdBot;
};

BotUtils.prototype.delete = function(idB, callback) {
    var Bot = models.Bot;
    if(idB) {
        Bot.find({
            "where" : {
                idBot : idB
            }
        }).then(function(result) {
            if(result) {
                result.destroy().then(function(success) {
                    callback(success);
                }).catch(function(err) {
                    callback(err);
                });
            } else {
                callback("error can't find " + idB);
            }
        }).catch(function(err) {
            callback(err);
        });
    }
};

BotUtils.prototype.findEnemy = function(idB,iduser, callback) {
    var Bot = models.Bot;
    if(idB) {
        Bot.findAll({
            "where" : {
                idBot : {
                    $ne : idB
                },
                userIdBot : {
                    $ne : iduser
                },
                modeBot : "aggro"
            },
            "order":[
                Sequelize.fn("RAND")
            ],
            limit:3
        }).then(function(result) {
            if(result) {
                callback(result);
            }
        }).catch(function(err) {
            callback(err);
        });
    }
};

BotUtils.prototype.win = function(idB,idBotLoose, callback) {
    var Bot = models.Bot;
    //console.log("id: " + idBot);
    //console.log("idloose :" + idBotLoose);
    if(idB) {
        Bot.find({
            "where" : {
                idBot : idB
            }
        }).then(function(result) {
            //console.log("result");
            if(result) {
                var nbPt= parseInt(result.pointBot) + 3;
                var nbWin = parseInt(result.winBot) + 1;
                result.updateAttributes({
                    pointBot : nbPt,
                    winBot:nbWin
                }).then(function(result){
                    callback(result);
                });
            }else {
                //console.log("bot not found");
            }
        }).catch(function(err) {
            callback(err);
        });
    }
};

BotUtils.prototype.loose = function(idB,iduser, callback) {
    var Bot = models.Bot;

    if(idB) {
        Bot.find({
            "where" : {
                idBot : idB
            }
        }).then(function(result) {
            var nbPt = parseInt(result.pointBot);
            if(result.pointBot >= 3) {
                nbPt = nbPt - 3;
            } else {
                nbPt = 0;
            }
            var nbLoose = parseInt(result.loseBot) + 1;
            if(result) {
                result.updateAttributes({
                    pointBot : nbPt,
                    loseBot: nbLoose
                }).then(function(result){
                    callback(result);
                });
            } else {
                //console.log("bot not found");
            }
        }).catch(function(err) {
            callback(err);
        });
    }
};

module.exports=BotUtils;
