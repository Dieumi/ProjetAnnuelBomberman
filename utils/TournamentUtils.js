var models=require("../models");
var TournamentUtils=function(id,name,mini,created){

	this.idTournament=id;
  this.nameTournament=name,
  this.pointMiniTournament=mini,
  this.createdByTournament=created


}
TournamentUtils.prototype.delete = function(idTournament, callback) {
	var Tournament = models.Tournament;
	if(idTournament) {
		Tournament.find({
			"where" : {
				idTournament : idTournament
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idTournament);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};
TournamentUtils.prototype.update=function(request,attributes,callback){
		var Tournament=models.Tournament;
		Tournament.find(request).then(function(results){
			if(results){

				results.updateAttributes(attributes).then(function(results){
					console.log("Tournament update");
					callback(undefined,results);


				}).catch(function(err){
					console.log("Tournament pas  update");
				})
			}else{
				console.log("pas de result")
			}

		}).catch(function(err){
			console.log(err);
		});

}

module.exports=TournamentUtils;