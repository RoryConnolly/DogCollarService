// const { assert } = require('chai');
// const AWS = require('aws-sdk');
// const router = require('./routes/collarRouter')();

// describe('querying items from dynamodb', () => {
//   it('find specific collar data', (done) => {
//     const params = {
//       TableName: 'CollarData',
//       Key: {
//         collarId: 'abc1',
//         collarResp: '1',
//       },
//     };

//     const expectedResponse = {
//       message: 'success',
//       statusCode: 200,
//       data: {
//         activity: 'medium',
//         location: '90210',
//         barking: 'low',
//         dogName: 'Dash',
//         collarResp: '1',
//         collarId: 'abc1'
//       }
//     };

//     router.get()

//     const documentClient = new AWS.DynamoDB.DocumentClient();
//     documentClient.get(params, (err, data) => {
//       assert.strictEqual(data.body, expectedResponse);
//       done();
//     });
//   });
// });
