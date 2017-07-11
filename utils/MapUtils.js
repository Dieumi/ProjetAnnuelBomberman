var models=require("../models");
var MapUtils=function(id,nameMap){

    this.idMap=id;
    this.nameMap=nameMap;
};

MapUtils.prototype.delete = function(id, callback) {
    var map = models.Map;
    if(id) {
        map.find({
            "where" : {
                idMap : id
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
    } else {
        callback(results);
    }
};

module.exports=MapUtils;
