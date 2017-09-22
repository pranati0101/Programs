var server=require('../server.js');
var chai=require('chai');
var expect=require('chai').expect;
var decribe=require('mocha').describe;
var request = require("request");
var mocha=require('mocha');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

// describe('signup api', function(){
//     it('should register', function(callback){
//       chai.request(server)
//           .post("/newUser")
//           .send({
//             userid:"david",
//             password:"1234"
//           })
//           .end(function(err, res){
//               res.should.have.status(200);
//               // res.body.should.be.a('json');
//               expect(res.body.data).to.equal(true);
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
// });

//
// describe('login api', function(){
//     it('should not login', function(callback){
//       chai.request(server)
//           .get("/login?userid=abc&password=7657")
//           .end(function(err, res){
//               res.should.have.status(200);
//               // res.body.should.be.a('json');
//               expect(res.body.status).to.equal("invalid");
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
//     it('should login', function(callback){
//       chai.request(server)
//           .get("/login?userid=ram&password=1234")
//           .end(function(err, res){
//               res.should.have.status(200);
//               // res.body.should.be.a('json');
//               expect(res.body.status).to.not.equal("invalid");
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
// });
//
// describe('search api', function(){
//     it('give null value', function(callback){
//       chai.request(server)
//           .post("/search")
//           .send({
//             userid:"abc",
//             password:"1234"
//           })
//           .end((err, res) => {
//               res.should.have.status(200);
//               expect(res.body.data).to.equal(false);
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
//     it('give value', function(callback){
//       chai.request(server)
//           .post("/search")
//           .send({
//             userid:"ram",
//             password:"1234"
//           })
//           .end((err, res) => {
//               res.should.have.status(200);
//               expect(res.body.data).to.equal(true);
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
// });

// describe('delete api', function(){
//     it('give null value', function(callback){
//       chai.request(server)
//           .post("/delete")
//           .send({
//             userid:"abc",
//             password:"1234"
//           })
//           .end((err, res) => {
//               res.should.have.status(200);
//               expect(res.body.data).to.equal(false);
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
//     it('delete user', function(callback){
//       chai.request(server)
//           .post("/delete")
//           .send({
//             userid:"david",
//             password:"1234"
//           })
//           .end((err, res) => {
//               res.should.have.status(200);
//               expect(res.body.data).to.equal(true);
//               // res.body.length.should.be.eql(0);
//             callback();
//           });
//     });
// });

describe('update api', function(){
    it('give null value', function(callback){
      chai.request(server)
          .post("/update")
          .send({
            userid:"abc",
            password:"1234"
          })
          .end((err, res) => {
              res.should.have.status(200);
              expect(res.body.data).to.equal(false);
            callback();
          });
    });
    // it('update user', function(callback){
    //   chai.request(server)
    //       .post("/update")
    //       .send({
    //         userid:"ram",
    //         password:"1234"
    //       })
    //       .end((err, res) => {
    //           res.should.have.status(200);
    //           expect(res.body.data).to.equal(true);
    //           // res.body.length.should.be.eql(0);
    //         callback();
    //       });
    // });
});
