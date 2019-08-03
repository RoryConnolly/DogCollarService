const sinon = require('sinon');
const clientController = require('../controllers/clientController');

describe('Client Controller Tests:', () => {
  describe('Post', () => {
    it('should throw an error when trying to post to the database without a collarId', () => {
      const req = {
        body: {
          activity: 'low',
          location: '90210',
          barking: 'high',
          dogName: 'Dash',
          collarResp: '8'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = clientController();
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Collar ID and Collar Response required').should.equal(true);
    });
  });
});
