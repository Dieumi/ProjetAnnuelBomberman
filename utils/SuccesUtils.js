var models=require("../models");
var SuccesUtils=function(id,name,img){
    this.idSucces=id;
    this.nameSucces=name;
    this.imgSucces=img;
};

SuccesUtils.prototype.delete = function(id, callback) {
    var Succes = models.Succes;
    if(id) {
        Succes.find({
            "where" : {
                idSucces : id
            }
        }).then(function(result) {
            if(result) {
                result.destroy().then(function(Succes) {
                    callback(Succes);
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

module.exports=SuccesUtils;
