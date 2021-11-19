//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
let expect = chai.expect;
//pass API address to avoid express type error "TypeError: app.address is not a function"
const API = "http://localhost:5000";

chai.use(chaiHttp);
//Our parent block
describe("Posts", () => {
  /*
   * Test the /GET route
   */
  describe("/GET Posts no query params", () => {
    it("it should respond status 400", (done) => {
      chai
        .request(API)
        .get("/api/posts")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("/GET Posts no query params", () => {
    it("it should respond error message with appropriate context", (done) => {
      chai
        .request(API)
        .get("/api/posts")
        .end((err, res) => {            
          res.text.should.contain("Tags parameter is required");
          done();
        });
    });
  });

  describe("/GET Posts no query params", () => {
    it("it should respond error message with appropriate context", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history&sortBy=none")
        .end((err, res) => {            
          res.text.should.contain("sortBy parameter is invalid");
          done();
        });
    });
  });

  describe("/GET Posts no query params", () => {
    it("it should respond error message with appropriate context", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=tech&sortBy=id&direction=descc")
        .end((err, res) => {            
          res.text.should.contain("direction parameter is invalid");
          done();
        });
    });
  });

  describe("/GET Posts single param", () => {
    it("it should respond status 200", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history")
        .end((err, res) => {
          res.should.have.status(200);          
          done();
        });
    });
  });


  describe("/GET Posts single param", () => {
    it("it should contain an array of posts", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history")
        .end((err, res) => {          
          res.body.should.be.an('array');          
          done();
        });
    });
  });

  describe("/GET Posts single param", () => {
    it("it should contain an array of posts matching the query param", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history")
        .end((err, res) => {         
          for(let i = 0;i < res.body.length; i++)
          {
            expect(res.body[i].tags).to.be.an('array').that.does.include('history')
          }
          done();
        });
    });
  });

  describe("/GET Posts multiple param", () => {
    it("each post should match AT LEAST one of the tags", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science")
        .end((err, res) => {                    
          for(let i = 0;i < res.body.length; i++)
          {
            expect(res.body[i].tags).to.be.an('array').and.to.satisfy((tags) =>
            {
                return tags.includes("history") || tags.includes("science")
            });
          }
          done();
        });
    });
  });

  describe("/GET Posts single param", () => {
    it("it should sorted in default order (id,asc)", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.id >= posts[i].id); 
            });          
          done();
        });
    });
  });

  describe("/GET Posts multiple param", () => {
    it("each post should be sorted by likes and ascending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=likes")
        .end((err, res) => {                                        
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.likes >= posts[i].likes); 
            });          
          done();
        });
    });
  });

  describe("/GET Posts multiple param", () => {
    it("each post should be sorted by reads and ascending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=reads")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.reads >= posts[i].reads); 
            });          
          done();
        });
    });
  });

  describe("/GET Posts multiple param", () => {
    it("each post should be sorted by popularity and ascending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=popularity")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.popularity >= posts[i].popularity); 
            });        
          done();
        });
    });
  });



  describe("/GET Posts multiple param", () => {
    it("each post should be sorted by likes and descending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=likes&direction=desc")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.likes <= posts[i].likes); 
            });          
          done();
        });
    });    
  });

  describe("/GET Posts multiple param", () => {
    it("each post should be sorted by reads and descending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=reads&direction=desc")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.reads <= posts[i].reads); 
            });          
          done();
        });
    });    
  });

  describe("/GET Posts multiple param", () => {
    it("each post should be sorted by popularity and descending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=popularity&direction=desc")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.popularity <= posts[i].popularity); 
            });          
          done();
        });
    });    
  });

  describe("/GET Posts multiple param missing SortBy", () => {
    it("each post should be sorted by default (id) and descending order", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&direction=desc")
        .end((err, res) => {                              
            expect(res.body).to.be.an('array').and.to.satisfy((posts) =>
            {
                return posts.slice(1).every((p,i) => p.id <= posts[i].id); 
            });          
          done();
        });
    });    
  });

  describe("/GET Posts multiple param SortBy=''", () => {
    it("response should have status code 400", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=&direction=desc")
        .end((err, res) => {       
            res.should.have.status(400);                                   
          done();
        });
    });    
  });

  describe("/GET Posts multiple param direction=''", () => {
    it("response should have status code 400", (done) => {
      chai
        .request(API)
        .get("/api/posts?tags=history,science&sortBy=likes&direction=")
        .end((err, res) => {       
            res.should.have.status(400);                                   
          done();
        });
    });    
  });

});
