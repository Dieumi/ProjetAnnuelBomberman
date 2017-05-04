var models=require("../models");
var MapUtils=function(id,nameMap){

	this.idMap=id;
  this.nameMap=nameMap
}
MapUtils.prototype.delete = function(idMap, callback) {
	var map = models.Map;
	if(idMap) {
		map.find({
			"where" : {
				idMap : idMap
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idMap);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};

module.exports=MapUtils;
