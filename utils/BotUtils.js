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
    } else {
        callback(results);
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
                Sequelize.fn('RAND')
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

module.exports=BotUtils;
