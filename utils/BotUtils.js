var models=require("../models");
var BotUtils=function(id,nameBot,codeBot,winBot,loseBot,pointBot,modeBot,userIdBot){
	this.idBot=id;
	this.nameBot=nameBot,
	this.codeBot=codeBot,
	this.winBot=winBot,
	this.loseBot=loseBot,
	this.pointBot=pointBot,
	this.modeBot=modeBot,
	this.userIdBot=userIdBot

}
BotUtils.prototype.delete = function(idBot, callback) {
	var Bot = models.Bot;
	if(idBot) {
		Bot.find({
			"where" : {
				idBot : idBot
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idBot);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};

module.exports=BotUtils;
