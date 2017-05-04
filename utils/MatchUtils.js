var models=require("../models");
var MatchUtils=function(id,resultMatch,dateMatch,idMapMatch,idTournamentMatch){

	this.idMatch=id;
  this.resultMatch=resultMatch,
  this.dateMatch=dateMatch,
  this.idMapMatch=idMapMatch,
  this.idTournamentMatch=idTournamentMatch

}
MatchUtils.prototype.delete = function(idMatch, callback) {
	var Match = models.Match;
	if(idMatch) {
		Match.find({
			"where" : {
				idMatch : idMatch
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idMatch);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};
MatchUtils.prototype.update=function(request,attributes,callback){
		var Match=models.Match;
		Match.find(request).then(function(results){
			if(results){

				results.updateAttributes(attributes).then(function(results){
					console.log("Match update");
					callback(undefined,results);


				}).catch(function(err){
					console.log("Match pas  update");
				})
			}else{
				console.log("pas de result")
			}

		}).catch(function(err){
			console.log(err);
		});

}

module.exports=MatchUtils;
