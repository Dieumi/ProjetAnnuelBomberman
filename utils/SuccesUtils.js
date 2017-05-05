var models=require("../models");
var SuccesUtils=function(id,name,img){

	this.idSucces=id;
  this.nameSucces=name,
  this.imgSucces=img


}
SuccesUtils.prototype.delete = function(idSucces, callback) {
	var Succes = models.Succes;
	if(idSucces) {
		Succes.find({
			"where" : {
				idSucces : idSucces
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(Succes) {
					callback(Succes);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idSucces);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};

module.exports=SuccesUtils;
