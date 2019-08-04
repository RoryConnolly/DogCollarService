const AWS = require('aws-sdk');
const express = require('express');
const clientController = require('../controllers/clientController');
const handleSuccess = require('../controllers/handleResponse');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

function routes() {
  const router = express.Router();
  const docClient = new AWS.DynamoDB.DocumentClient();
  const handle = handleSuccess();
  const controller = clientController();
  const table = 'CollarData';

  router.route('/fetch/ByID').get(controller.get);
  router.route('/collar').post(controller.post);
  router.route('/remove').delete(controller.remove);
  // router.route('/query').get(controller.query);
  router.route('/fetch').get((req, res) => {
    const params = {
      TableName: table,
    };

    function onScan(err, data) {
      if (err) {
        handle.handleError(err, res);
      } else {
        handle.handleSuccess(data.Items, res);
      }
    }

    docClient.scan(params, onScan);
  });
  router.route('/fetch/barkingHigh').get((req, res) => {
    const params = {
      TableName: table,
      ExpressionAttributeValues: { ':topic': 'high' },
      FilterExpression: 'barking = :topic'
    };

    function onScan(err, data) {
      if (err) {
        handle.handleError(err, res);
      } else {
        handle.handleSuccess(data.Items, res);
      }
    }

    docClient.scan(params, onScan);
  });

  return router;
}

module.exports = routes;
