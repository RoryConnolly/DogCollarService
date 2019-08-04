// const sinon = require('sinon');
// const docClientController = require('../controllers/docClientController');

// describe('Document Client Controller Tests:', () => {
//   describe('Post', () => {
//     it('should throw an error when trying to post to the database without a collarId', () => {
//       const req = {
//         body: {
//           activity: 'low',
//           location: '90210',
//           barking: 'high',
//           dogName: 'Dash',
//           collarResp: '8'
//         }
//       };
//       // const res = {};
//       const res = {
//         status: sinon.spy(),
//         send: sinon.spy(),
//         json: sinon.spy()
//       };

//       const controller = docClientController();
//       controller.post(req, res);
//       console.log(req);
//       console.log(res.status());

//       res.status.should.equal('400');
//       res.send.calledWith('Invalid Schema i.e. activity: low, location: 37901, barking: high, dogName: Bouncer, collarResp: 5, collarId: abc6').should.equal(true);
//     });
//   });
// });
