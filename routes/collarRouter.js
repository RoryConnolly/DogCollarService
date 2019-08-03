const AWS = require('aws-sdk');
const express = require('express');

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

function handlePutSuccess(data, res) {
  res.json({ message: 'success', statusCode: 201, data });
}

function routes() {
  const router = express.Router();
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';

  router.get('/fetch', (req, res) => {
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

  router.get('/fetch/ByID', (req, res) => {
    const query = {};
    if (req.query.collarId) {
      query.collarId = req.query.collarId;
    }
    if (req.query.collarResp) {
      query.collarResp = req.query.collarResp;
    }

    const params = {
      TableName: table,
      Key: {
        collarId: query.collarId,
        collarResp: query.collarResp,
      },
    };

    docClient.get(params, (err, data) => {
      if (err) {
        handleError(err, res);
      } else {
        handleSuccess(data.Item, res);
      }
    });
  });

  router.post('/collar', (req, res) => {
    const params = {
      TableName: table,
      Item: req.body
    };

    docClient.put(params, (err, data) => {
      if (err) {
        handleError(err, res);
      } else {
        handlePutSuccess(data.Item, res);
      }
    });
  });

  router.delete('/remove', (req, res) => {
    const query = {};
    if (req.query.collarId) {
      query.collarId = req.query.collarId;
    }
    if (req.query.collarResp) {
      query.collarResp = req.query.collarResp;
    }

    const params = {
      TableName: table,
      Key: {
        collarId: query.collarId,
        collarResp: query.collarResp,
      },
    };

    // TODO do proper codes for delete 204
    docClient.delete(params, (err, data) => {
      if (err) {
        handleError(err, res);
      } else {
        handleSuccess(data.Item, res);
      }
    });
  });

  return router;
}

module.exports = routes;
