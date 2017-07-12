var models=require("../models");
var UserUtils=function(id,login,password,email,type){
    this.idUser=id;
    this.loginUser=login;
    this.passwordUser=password;
    this.emailUser=email;
    this.typeUser=type
};

UserUtils.prototype.delete = function(idU, callback) {
    var User = models.User;
    if(idU) {
        User.find({
            "where" : {
                idUser : idU
            }
        }).then(function(result) {
            if(result) {
                result.destroy().then(function(success) {
                    //console.log("deleted user");
                    callback(success);

                }).catch(function(err) {
                    callback(err);
                });
            } else {
                callback("error can't find " + idU);
            }
        }).catch(function(err) {
            callback(err);
        });
    } else {
        callback(results);
    }
};

module.exports=UserUtils;
