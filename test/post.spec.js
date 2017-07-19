var request = require("supertest-session");
var api=require("../server.js");


describe("post",function(){


    describe("POST /post",function(){
        it("should generate post", function(done){
            var data={titlePost: "test",authorPost:"test",textPost: "test123"};
            request(api).post("/post").type("form").send(data).expect(200).expect({"code":"0","titlePost":"test","textPost":"test123","authorPost":"test"}).end(function(err,res){
                if(err) {
                    done(err);
                }else{
                    done();
                }
            });
        })
    });
		/*describe("get /post/latest",function(){
        it("should get latest post ", function(done){
            request(api).get("/posts/latest").expect(200).expect({"code":"0",  "results": [ {'authorPost': 'test',
                         'createdAt': '2017-07-16T15:15:22.000Z',
                        'deletedAt': null,
                        'idPost': 30,
                        'textPost': 'test123',
                        'titlePost': 'test',
                        'updatedAt': '2017-07-16T15:15:22.000Z'
                      },{

                        'authorPost': 'test',
                        'createdAt': '2017-07-16T15:15:01.000Z',
                        'deletedAt': null,
                        'idPost': 29,
                        'textPost': 'test123',
                        'titlePost': 'test',
                        'updatedAt': '2017-07-16T15:15:01.000Z',

                      },{

                        'authorPost': 'test',
                        'createdAt': '2017-07-16T15:14:02.000Z',
                        'deletedAt': null,
                        'idPost': 28,
                        'textPost': 'test123',
                        'titlePost': 'test',
                        'updatedAt': '2017-07-16T15:14:0.000Z'
                      }
                    ]}
                    ).end(function(err,res){
                if(err) {
                    done(err);
                }else{
                    done();
                }
            });
        })
    });*/


	
});
