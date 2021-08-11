process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let { QRConfigurationModel } = require('../models/qrconfiguration.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.ts');
let should = chai.should();

chai.use(chaiHttp);

describe('Github Actions Test', () => {
  describe('it should succeed!', () => {
    it('should success', (done) => {
      let something = true;
      let something_else = true;

      something_else.should.be.eql(something);
      done();
    })
  })
})

describe('QRConfigurations', () => {
    beforeEach((done) => { //Before each test we empty the database
        QRConfigurationModel.deleteMany({}, (err) => {
           done();
        });
    });
    
  /*
  * Test the /GET route
  */
  describe('/GET QRConfigurations', () => {
      it('it should GET all the QRConfigurations', (done) => {
        chai.request(server)
            .get('/qr')
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.type.should.be.eql('success');
                  res.body.data.should.be.a('array')
                  res.body.data.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
  describe('/POST QRConfigurations', () => {
    it('it should create a new QRConfiguration', (done) => {
      let data = {
        owner_id: "ownerid",
        nickname: "nickname",
        created_on: Date.now(),
        owner_type: "user"
      }
      chai.request(server)
          .post('/qr')
          .send(data)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.type.should.be.eql('success');
                res.body.data.should.be.a('array')
                res.body.data.length.should.be.eql(0);
            done();
          });
    });
});

});