var models=require("../models");
var MatchUtils=function(id,resultMatch,dateMatch,idMapMatch,idTournamentMatch){
    this.idMatch=id;
    this.resultMatch=resultMatch;
    this.dateMatch=dateMatch;
    this.idMapMatch=idMapMatch;
    this.idTournamentMatch=idTournamentMatch;
};

MatchUtils.prototype.delete = function(id, callback) {
    var Match = models.Match;
    if(id) {
        Match.find({
            "where" : {
                idMatch : id
            }
        }).then(function(result) {
            if(result) {
                result.destroy().then(function(success) {
                    callback(success);
                }).catch(function(err) {
                    callback(err);
                });
            } else {
                callback("error can't find " + id);
            }
        }).catch(function(err) {
            callback(err);
        });
    }
};

MatchUtils.prototype.update=function(request,attributes,callback){
    var Match=models.Match;
    Match.find(request).then(function(results){
        if(results){
            results.updateAttributes(attributes).then(function(results){
                callback(null,results);
            }).catch(function(err){
            });
        } else {
        }
    }).catch(function(err){
    });
};

module.exports=MatchUtils;
