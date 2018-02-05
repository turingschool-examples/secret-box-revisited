const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return the home page with text', () => {
    return chai.request(server)
    .get('/')
    .then((response) => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch((error) => {
      throw error;
    });
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/sad')
    .then((response) => {
      response.should.have.status(404);
    })
    .catch((error) => {
      throw error;
    });
  });

});

describe('API Routes', () => {

  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();
  });

  describe('GET /api/secrets/:id', () => {

    it('should return the secret by ID', () => {
      return chai.request(server)
        .get('/api/secrets/1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('message');
          response.body[0].message.should.equal('I hate mashed potatoes');
        })
        .catch((error) => {
          throw error;
        });
    });

  });

  describe('POST /api/secrets', () => {

    it('should add a secret', () => {
      return chai.request(server)
        .post('/api/secrets')
        .send({
          message: "I am in love with Mr. Wigglesworth."
        })
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.a('array');
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(4);
          response.body[0].should.have.property('message');
          response.body[0].message.should.equal('I am in love with Mr. Wigglesworth.');
        })
        .catch((error) => {
          throw error;
        });
    });

    it('should not add a secret if message is not provided', () => {
      return chai.request(server)
        .post('/api/secrets')
        .send({})
        .then((response) => {
          response.should.have.status(422);
        })
        .catch((error) => {
          throw error;
        });
    });

  });

});
