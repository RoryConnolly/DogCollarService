require('should');

const request = require('supertest');

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
      partitionKey: '12345-12345-1ab2cd3',
      activityType: 'LOCATION',
      actionData: {
        location: {
          lat: '11.17',
          long: '90.33'
        }
      }
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
      activityType: 'LOCATION',
      actionData: {
        location: {
          lat: '11.17',
          long: '90.33'
        }
      }
    };

    agent.post('/api/pushCollarData')
      .send(collarData)
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Invalid request object');
        done();
      });
  });

  it('should get specific Collar Data Response from the db and return a 200', (done) => {
    agent.get('/api/fetch/ByPartitionAndSortKeys?partitionKey=54668-30073-6ad9de2&sortKey=1565105507274_BARK')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data.should.have.property('createdAt', '2019-08-06T15:31:47.274Z');
        res.body.data.should.have.property('activityType', 'BARK');
      });
    done();
  });

  it('should not get a Collar Data Response when incorrect params are used', (done) => {
    agent.get('/api/fetch/ByPartitionAndSortKeys?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Partition Key and Sort Key params required');
      });
    done();
  });

  it('should only get Collar Data Responses containing Barking for a specific Partition from the db and return a 200', (done) => {
    agent.get('/api/fetch/ByPartitionAndActivity?partitionKey=54668-30073-6ad9de2&activityType=BARK')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data[0].should.have.property('activityType', 'BARK');
        res.body.data[1].should.have.property('activityType', 'BARK');
      });
    done();
  });

  it('should not get Collar Data Responses containing Medium Barking when incorrect params are used', (done) => {
    agent.get('/api/fetch/ByPartitionAndActivity?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Valid query parameter required');
      });
    done();
  });

  // it('should only get Collar Data Responses containing Low Activity from the db and return a 200', (done) => {
  //   agent.get('/api/fetch/allByActivity?activity=low')
  //     .expect(200)
  //     .end((err, res) => {
  //       res.body.message.should.equal('success');
  //       res.body.data[0].should.have.property('activity', 'low');
  //       res.body.data[1].should.have.property('activity', 'low');
  //       res.body.data[2].should.have.property('activity', 'low');
  //     });
  //   done();
  // });

  // it('should not get Collar Data Responses containing Low Activity when incorrect params are used', (done) => {
  //   agent.get('/api/fetch/allByActivity?blah=blah')
  //     .expect(400)
  //     .end((err, res) => {
  //       res.body.message.should.equal('Activity value required: i.e. activity=low');
  //     });
  //   done();
  // });

  // it('should only get Collar Data Responses containing TN Zip Codes from the db and return a 200', (done) => {
  //   agent.get('/api/fetch/allByLocation?location=37901')
  //     .expect(200)
  //     .end((err, res) => {
  //       res.body.message.should.equal('success');
  //       res.body.data[0].should.have.property('location', '37901');
  //       res.body.data[1].should.have.property('location', '37901');
  //       res.body.data[2].should.have.property('location', '37901');
  //     });
  //   done();
  // });

  // it('should not get Collar Data Responses containing TN Zip Codes when incorrect params are used', (done) => {
  //   agent.get('/api/fetch/allByLocation?blah=blah')
  //     .expect(400)
  //     .end((err, res) => {
  //       res.body.message.should.equal('Location (zipcode) value required: i.e. location=37901');
  //     });
  //   done();
  // });

  it('should only get Collar Data Responses from the same Partition from the db and return a 200', (done) => {
    agent.get('/api/fetch/allByPartitionKey?partitionKey=12345-12345-1ab2cd3')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('success');
        res.body.data[0].should.have.property('partitionKey', '12345-12345-1ab2cd3');
        res.body.data[1].should.have.property('partitionKey', '12345-12345-1ab2cd3');
        res.body.data[2].should.have.property('partitionKey', '12345-12345-1ab2cd3');
      });
    done();
  });

  it('should not get Collar Data Responses from the same Partition when incorrect params are used', (done) => {
    agent.get('/api/fetch/allByPartitionKey?blah=blah')
      .expect(400)
      .end((err, res) => {
        res.body.message.should.equal('Valid query parameter required');
      });
    done();
  });


  it('should allow Collar Data Response to be deleted from the db and return a 200', (done) => {
    agent.delete('/api/remove?partitionKey=12345-12345-1ab2cd3&sortKey=7530742165588_BARK')
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
        res.body.message.should.equal('Partition Key and Sort Key required');
      });
    done();
  });
});
