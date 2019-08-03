const AWS = require('aws-sdk');
const express = require('express');
const clientController = require('../controllers/clientController');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

function handleError(err, res) {
  res.json({
    message: 'server side error',
    statusCode: 500,
    error:
    err
  });
}

function handleSuccess(data, res) {
  res.json({ message: 'success', statusCode: 200, data });
}

// function handlePutSuccess(data, res) {
//   res.json({ message: 'success', statusCode: 201, data });
// }

function routes() {
  const router = express.Router();
  const docClient = new AWS.DynamoDB.DocumentClient();
  const controller = clientController();
  const table = 'CollarData';

  router.route('/fetch/ByID').get(controller.get);
  router.route('/collar').post(controller.post);
  router.route('/remove').delete(controller.remove);
  router.route('/fetch').get((req, res) => {
    const params = {
      TableName: table,
    };

    function onScan(err, data) {
      if (err) {
        handleError(err, res);
      } else {
        handleSuccess(data.Items, res);
      }
    }

    docClient.scan(params, onScan);
  });

  return router;
}

module.exports = routes;
