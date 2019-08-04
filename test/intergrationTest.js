require('should');

const request = require('supertest');

// process.env.ENV = 'Test';

const app = require('../app.js');

const agent = request.agent(app);

describe('Saving Collar Data Test', () => {
  it('should allow Collar Data Response to be posted to the db and return a 200', (done) => {
    const bookPost = {
      activity: 'low',
      location: '90210',
      barking: 'high',
      dogName: 'Dash',
      collarResp: '96',
      collarId: 'abc1'
    };

    agent.post('/api/collar')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.message.should.equal('success');
        done();
      });
  });

  // afterEach((done) => {
  //   done();
  // });

  // after((done) => {
  //   app.server.close(done());
  // });
});
