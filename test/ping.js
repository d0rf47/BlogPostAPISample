//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
//pass API address to avoid express type error "TypeError: app.address is not a function"
const API = "http://localhost:5000";

chai.use(chaiHttp);
//Our parent block
describe("Ping", () => {
  /*
   * Test the /GET route
   */
  describe("/GET ping", () => {
    it("it should respond status 200", (done) => {
      chai
        .request(API)
        .get("/api/ping")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
