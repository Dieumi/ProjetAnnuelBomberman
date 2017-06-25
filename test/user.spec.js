var request = require("supertest-session");
var api=require("../server.js");


describe('user',function(){
	describe('GET /',function(){
		it("should return a webpage", function(){

			return request(api).get('/').send().expect(200);
		})
	})

	describe("POST /user",function(){
		it("should generate user", function(done){
			var data={loginUser: 'test',emailUser:"test@test.com",passwordUser: 'test123'};
			 request(api).post('/user').type('form').send(data).expect(200).expect({"code":"0","loginUser":"test","emailUser":"test@test.com"}).end(function(err,res){
					if(err) {
						done(err);
					}else{
						done();
					}

			});
  })
})
  describe('GET /user/find',function(){
    it("should return a user", function(){
      		var data={loginUser: 'test'};
      return request(api).get('/user/find').send(data).expect(200).expect({"code":"0","emailUser":"test@test.com","loginUser":"test","typeUser":"user"});
    })
  })
	describe("GET /ListeUser",function(){
		it("should  display a list of user", function(){
			return request(api).get('/ListeUser').expect(200);
		})
	})
  describe("DELETE /deleteuser/:1",function(){
		it("should  deleteuser", function(){
			return request(api).delete('/deleteuser/:1').expect(200).expect({"user":"deleted"});
		})
	})
	/*	describe("POST /adduser",function(){
			it("should add user" , function(){

				return request(api).post('/adduser').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200).expect({"user":"created"});
			})*
	})*/
});
