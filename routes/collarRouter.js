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

function routes() {
  const router = express.Router();
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';

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
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
        handleError(err, res);
      } else {
        console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
        handleSuccess(data.Item, res);
      }
    });
  });

  router.post('/collar', (req, res) => {
    res.json({ requestBody: req.body });
    const collar = {};
    if (req.body.collarId) {
      collar.collarId = req.body.collarId;
    }
    if (req.body.collarResp) {
      collar.collarResp = req.body.collarResp;
    }
    if (req.body.dogName) {
      collar.dogName = req.body.dogName;
    }
    if (req.body.barking) {
      collar.barking = req.body.barking;
    }
    if (req.body.location) {
      collar.location = req.body.location;
    }
    if (req.body.activity) {
      collar.activity = req.body.activity;
    }

    const params = {
      TableName: table,
      Item: {
        activity: collar.activity,
        location: collar.location,
        barking: collar.barking,
        dogName: collar.dogName,
        collarResp: collar.collarResp,
        collarId: collar.collarId
      }
    };

    docClient.put(params, (err, data) => {
      if (err) {
        handleError(err, res);
      } else {
        handleSuccess(data.Item, res);
      }
    });
  });

  router.get('/fetch', (req, res) => {
    const params = {
      TableName: table,
    };

    function onScan(err, data) {
      if (err) {
        console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
        handleError(err, res);
      } else {
        console.log('Scan succeeded:', JSON.stringify(data, null, 2));
        handleSuccess(data.Items, res);
      }
    }
    console.log('Scanning for Dog Collar Data');
    docClient.scan(params, onScan);
  });

  return router;
}

module.exports = routes;
