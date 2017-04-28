var models=require("../models");
var UserUtils=function(id,login,password,email,type){

	this.idUser=id;
  this.loginUser=login,
  this.passwordUser=password,
  this.emailUser=email,
  this.typeUser=type

}
UserUtils.prototype.delete = function(idUser, callback) {
	var User = models.User;
	if(idUser) {
		User.find({
			"where" : {
				idUser : idUser
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idUser);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};

module.exports=UserUtils;
