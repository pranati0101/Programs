var server=require('../server.js');
var chai=require('chai');
var expect=require('chai').expect;
var decribe=require('mocha').describe;
var request = require("request");
var mocha=require('mocha');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('login api', () => {
    it('should not login', (callback) => {
      chai.request(server)
          .get("/login?user='abc'&password='7657'")
          .end((err, res) => {
              res.should.have.status(200);
              // res.body.should.be.a('json');
              expect(res.body.status).to.equal("invalid");
              // res.body.length.should.be.eql(0);
            callback();
          });
    });
});

describe('search api', () => {
    it('give null value', (callback) => {
      chai.request(server)
          .post("/search")
          .end((err, res) => {
              res.should.have.status(200);
              expect(res.body.status).to.equal("invalid");
              // res.body.length.should.be.eql(0);
            callback();
          });
    });
});
/*
* Test the /POST route
*/
// describe('/POST book', () => {
//     it('it should not POST a book without pages field', (done) => {
//       let book = {
//           title: "The Lord of the Rings",
//           author: "J.R.R. Tolkien",
//           year: 1954
//       }
//       chai.request(server)
//           .post('/book')
//           .send(book)
//           .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('errors');
//               res.body.errors.should.have.property('pages');
//               res.body.errors.pages.should.have.property('kind').eql('required');
//             done();
//           });
//     });
//
// });
// });
