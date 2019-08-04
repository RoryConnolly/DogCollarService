require('should');

const request = require('supertest');

// process.env.ENV = 'Test';

const app = require('../app.js');

const agent = request.agent(app);

describe('Saving Collar Data Tests', () => {
  it('should get all Collar Data Responses from the db and return a 200', (done) => {
    agent.get('/api/fetch/all')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
      });
    done();
  });


  it('should allow Collar Data Response to be posted to the db and return a 200', (done) => {
    const collarData = {
      activity: 'low',
      location: '90210',
      barking: 'high',
      dogName: 'Dash',
      collarResp: '96',
      collarId: 'abc1'
    };

    agent.post('/api/pushCollarData')
      .send(collarData)
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('successfully added to the db');
        done();
      });
  });

  it('should not allow Collar Data Response with missing params to be posted to the db and return a 400', (done) => {
    const collarData = {
      activity: 'low',
      location: '90210',
      barking: 'high',
      collarResp: '96',
      collarId: 'abc1'
    };

    agent.post('/api/pushCollarData')
      .send(collarData)
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Invalid Schema i.e. activity: low, location: 37901, barking: high, dogName: Bouncer, collarResp: 5, collarId: abc6');
        done();
      });
  });

  it('should get specific Collar Data Response from the db and return a 200', (done) => {
    agent.get('/api/fetch/SpecificCollarRespByID?collarId=abc1&collarResp=96')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data.should.have.property('barking', 'high');
        res.body.data.should.have.property('activity', 'low');
        res.body.data.should.have.property('location', '90210');
      });
    done();
  });

  it('should not specific get Collar Data Responses when incorrect params are used', (done) => {
    agent.get('/api/fetch/SpecificCollarRespByID?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Collar ID and Collar params required, i.e. collarId=abc2&collarResp=3');
      });
    done();
  });

  it('should only get Collar Data Responses containing Medium Barking from the db and return a 200', (done) => {
    agent.get('/api/fetch/allByBarking?barking=medium')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data[0].should.have.property('barking', 'medium');
        res.body.data[1].should.have.property('barking', 'medium');
        res.body.data[2].should.have.property('barking', 'medium');
      });
    done();
  });

  it('should not get Collar Data Responses containing Medium Barking when incorrect params are used', (done) => {
    agent.get('/api/fetch/allByBarking?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Barking value required: i.e. barking=medium');
      });
    done();
  });

  it('should only get Collar Data Responses containing Low Activity from the db and return a 200', (done) => {
    agent.get('/api/fetch/allByActivity?activity=low')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data[0].should.have.property('activity', 'low');
        res.body.data[1].should.have.property('activity', 'low');
        res.body.data[2].should.have.property('activity', 'low');
      });
    done();
  });

  it('should not get Collar Data Responses containing Low Activity when incorrect params are used', (done) => {
    agent.get('/api/fetch/allByActivity?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Activity value required: i.e. activity=low');
      });
    done();
  });

  it('should only get Collar Data Responses containing TN Zip Codes from the db and return a 200', (done) => {
    agent.get('/api/fetch/allByLocation?location=37901')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data[0].should.have.property('location', '37901');
        res.body.data[1].should.have.property('location', '37901');
        res.body.data[2].should.have.property('location', '37901');
      });
    done();
  });

  it('should not get Collar Data Responses containing TN Zip Codes when incorrect params are used', (done) => {
    agent.get('/api/fetch/allByLocation?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Location (zipcode) value required: i.e. location=37901');
      });
    done();
  });

  it('should only get Collar Data Responses from the same collar from the db and return a 200', (done) => {
    agent.get('/api/fetch/allByCollarId?collarId=abc3')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data[0].should.have.property('collarId', 'abc3');
        res.body.data[1].should.have.property('collarId', 'abc3');
        res.body.data[2].should.have.property('collarId', 'abc3');
      });
    done();
  });

  it('should not get Collar Data Responses from the same collar when incorrect params are used', (done) => {
    agent.get('/api/fetch/allByCollarId?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('CollarId value required: i.e. collarId=abc1');
      });
    done();
  });


  it('should allow Collar Data Response to be deleted to the db and return a 200', (done) => {
    agent.delete('/api/remove?collarId=abc1&collarResp=96')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
      });
    done();
  });

  it('should not allow Collar Data Response to be deleted with missing params', (done) => {
    agent.delete('/api/remove?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Collar ID and Collar params required, i.e. collarId=abc2&collarResp=3');
      });
    done();
  });
});
